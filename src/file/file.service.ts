import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { Resource } from '@prisma/client';
import { encode } from 'blurhash';
import { Response } from 'express';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'fs';
import mime from 'mime-types';
import { basename, join, parse } from 'path';
import sharp from 'sharp';
import { XConfig } from 'src/xconfig';
import { Readable } from 'stream';
import { resolve } from 'url';
import { ICDNUrl, IFileCompressUpload, IFindClosestSize, IFindFile, IGetImageDto, IGetTmpFile, IResolve, IUploadToObjectStorage } from './file.@types';
import { ResourceService } from './file.resource.service';

@Injectable()
export class FileService {
  private s3Client: S3Client
  constructor(
    private readonly config: XConfig,
    private readonly resourceService: ResourceService
  ) {
    const env = this.config.env
    this.s3Client = new S3Client({
      region: env.OBJECT_STORAGE_REGION,
      credentials: {
        accessKeyId: env.OBJECT_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: env.OBJECT_STORAGE_SECRET_ACCESS_KEY,
      },
      endpoint: env.OBJECT_STORAGE_ENDPOINT,
      forcePathStyle: env.OBJECT_STORAGE_FORCE_PATH_STYLE,
    });
  }
  // directory traversal attack prevention by replacing all character that is not alphanumeric or dot <.> or minus <->
  sanitizeFileName = (fileName: string): string => fileName.replace(/[^a-zA-Z0-9.-]/g, '')

  handleUpload = (file: Express.Multer.File) => ({ fileName: file.filename })

  findFile({ user, fileName }: IFindFile) {
    const filePath = join(this.config.env.TMP_FILE_PATH, 'user', user.id, this.sanitizeFileName(fileName))
    if (!existsSync(filePath)) throw new HttpException({ message: 'file not found' }, HttpStatus.NOT_FOUND)
    return filePath
  }

  async compressImage(filePath: string) {
    const parsedFilePath = parse(filePath);
    const outputFileDir = join(this.config.env.TMP_FILE_PATH, 'sharp');
    const outputFilePath = join(outputFileDir, `${parsedFilePath.name}.webp`);

    if (!existsSync(outputFileDir)) mkdirSync(outputFileDir, { recursive: true });
    const { data, info } = await sharp(filePath)
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } }).toFile(outputFilePath);
    const blurHash = encode(
      new Uint8ClampedArray(data),
      info.width,
      info.height,
      this.config.env.BLURHASH_COMPONENT_X,
      this.config.env.BLURHASH_COMPONENT_Y
    );
    return {
      outputFilePath, blurHash
    };
  }

  async uploadToObjectStorage({ filePath, prefix, fileName, blurHash, contentType }: IUploadToObjectStorage) {
    if (!existsSync(filePath)) {
      throw new HttpException({ message: 'File not found' }, HttpStatus.NOT_FOUND);
    }

    const originalFileName = basename(filePath);
    const { size } = statSync(filePath);
    const objectKey = join(prefix, fileName || originalFileName);

    let metadata;
    if (contentType.includes('image')) {
      metadata = await sharp(filePath).metadata();
    }
    const data = await this.s3Client.send(new PutObjectCommand({
      Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
      Key: objectKey,
      Body: readFileSync(filePath),
      ACL: 'public-read',
      ContentType: contentType,
    }));
    const resource = await this.resourceService.add({
      blurHash: contentType.startsWith('image/') ? blurHash : undefined,
      objectKey: objectKey,
      fileName: fileName || originalFileName,
      fileType: contentType,
      fileSize: size,
      metadata: metadata,
      objectUrl: this.resolve({ fileName: fileName || originalFileName, prefix }),
    });

    return resource;
  }
  async removeObjectFromStorage(objectKey: string) {
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
      Key: objectKey,
    }))
  }

  async fetchObject(objectKey: string) {
    await this.s3Client.send(new GetObjectCommand({
      Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
      Key: objectKey
    }))
  }

  async getTmpFile({ param, response, user }: IGetTmpFile) {
    const { fileName, userId } = param
    if (user.id !== userId) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
    const filePath = join(this.config.env.TMP_FILE_PATH, 'user', userId, this.sanitizeFileName(fileName))
    if (!existsSync(filePath)) throw new HttpException({ message: 'file not found' }, HttpStatus.NOT_FOUND)
    const contentType = mime.lookup(filePath)
    if (contentType === false) throw new HttpException({ message: 'unrecognized file type' }, HttpStatus.AMBIGUOUS)
    const fileStream = createReadStream(filePath);
    response.setHeader('Content-Type', contentType);
    fileStream.pipe(response)
  }

  resolve({ fileName, prefix }: IResolve) {
    return resolve(`${prefix}/`, fileName)
  }

  cdnUrl({ objectKey }: ICDNUrl) {
    return resolve(`${this.config.env.CDN_BASE_URL}`, objectKey)
  }

  isValidURL(url: unknown) {
    try {
      const parsedURL = new URL(url as string)
      return parsedURL.protocol === "http:" || parsedURL.protocol === "https:"
    } catch (error) {
      return false // Invalid URL
    }
  }

  async handleUploadObjectStorage({ fileName, user, prefix }: IFileCompressUpload) {
    const fileNames = Array.isArray(fileName) ? fileName : [fileName];
    const resources: Resource[] = [];
    for (const name of fileNames) {
      const contentType = mime.lookup(name);
      if (!contentType) {
        throw new Error('Unrecognized file type.');
      }
      let resource;
      if (contentType.includes("image")) {
        const baseName = name.split('.').slice(0, -1).join('.');
        const fileNameWebp = `${baseName}.webp`;
        resource = await this.resourceService.getResourceByObjectkey(fileNameWebp);
        if (!resource) {
          const filePath = this.findFile({ fileName: name, user });
          const { blurHash, outputFilePath } = await this.compressImage(filePath);
          resource = await this.uploadToObjectStorage({ filePath: outputFilePath, fileName: fileNameWebp, prefix, blurHash, contentType });
        }
      } else {
        const filePath = this.findFile({ fileName: name, user });
        resource = await this.uploadToObjectStorage({ filePath, fileName: name, prefix, contentType });
      }
      resources.push(resource);
    }

    return resources.length > 1 ? resources : resources[0];
  }

  async getObjectCustomize(response: Response, { param: { fileName, prefix }, query: { width, height } }: IGetImageDto) {
    const objectKey = `${prefix}/${fileName}`
    if (objectKey === undefined) throw new HttpException({ message: 'not found' }, HttpStatus.NOT_FOUND);
    const { body, resource } = await this.getObject(response, objectKey)
    const childResource = resource.childResources
    const childResourceLength = resource.childResources.length
    if (body === undefined) throw new HttpException({ message: 'file not found' }, HttpStatus.NOT_FOUND);
    if (height && width) {
      const fileNameWebp = fileName.split('.').slice(0, -1).join('.') + `_size=${width}x${height}.webp`;
      const newObjectKey = `${prefix}/${fileNameWebp}`
      const readableStream = body as Readable;
      const chunks: Buffer[] = [];
      for await (const chunk of readableStream) { chunks.push(chunk) }
      const buffer = Buffer.concat(chunks);
      const image = sharp(buffer);
      const resizedImage = image.resize({ width, height }).ensureAlpha();
      const { data, info } = await resizedImage.raw().toBuffer({ resolveWithObject: true });
      if (info.width && info.height && childResourceLength < this.config.env.MAX_CHILD_RESOURCE) {
        const blurHash = encode(
          new Uint8ClampedArray(data),
          info.width,
          info.height,
          this.config.env.BLURHASH_COMPONENT_X,
          this.config.env.BLURHASH_COMPONENT_Y
        );
        const resizedWebpBuffer = await resizedImage.webp().toBuffer();
        const webpMetadata = await resizedImage.metadata();
        await this.s3Client.send(new PutObjectCommand({
          Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
          Key: newObjectKey,
          Body: resizedWebpBuffer,
          ACL: 'public-read',
        }));
        const fileType = mime.lookup(newObjectKey)
        if (fileType === false) throw new HttpException({ message: 'unrecognized file' }, HttpStatus.CONFLICT)
        await this.resourceService.add({
          fileName: fileNameWebp,
          fileType: fileType,
          fileSize: webpMetadata.size ?? 0,
          objectKey: newObjectKey,
          blurHash,
          metadata: webpMetadata,
          objectUrl: fileNameWebp ? this.resolve({ fileName: fileNameWebp, prefix }) : undefined,
          relatedId: resource.id
        })
        const { body } = await this.getObject(response, newObjectKey)
        body.pipe(response)
        return true;
      } else {
        const childResourceXY = this.parseChildResource(childResource)
        const queryResourceXY = { sizeX: width, sizeY: height }
        const { closestSizeX, closestSizeY } = this.findClosestSize({ childResourceXY, queryResourceXY })
        const objectKeyParam = `${prefix}/${fileName.split('.').splice(0, 1)}_size=${closestSizeX}x${closestSizeY}.webp`
        const oldResource = this.findClosestSizeResource({ objectKeyParam }, childResource)
        if (!oldResource) throw new HttpException('child resource not found', HttpStatus.BAD_REQUEST)
        const { objectKey } = oldResource
        const { body } = await this.getObject(response, objectKey)
        body.pipe(response)
        return true;
      }
    }
    else {
      (body as Readable).pipe(response)
      return true;
    }
  }
  findClosestSizeResource({ objectKeyParam }, resource: Resource[]) {
    const images = resource.find(({ objectKey }) => objectKey == objectKeyParam)
    return images
  }
  parseChildResource(resource: Resource[]) {
    return resource.map(({ fileName }) => {
      const regex = /size=(\d+)x(\d+)/;
      const match = fileName.match(regex);
      if (!match) { throw new HttpException("child resource not found to parse", HttpStatus.BAD_REQUEST) }
      const sizeX = parseInt(match[1], 10);
      const sizeY = parseInt(match[2], 10);
      return { sizeX, sizeY };
    })
  }
  findClosestSize({ childResourceXY, queryResourceXY }: IFindClosestSize) {
    let closestSizeX: number | undefined;
    let closestSizeY: number | undefined;
    let minDifference = Infinity;
    for (const { sizeX, sizeY } of childResourceXY) {
      const differenceX = Math.abs(queryResourceXY.sizeX - sizeX);
      const differenceY = Math.abs(queryResourceXY.sizeY - sizeY);
      const totalDifference = differenceX + differenceY;
      if (totalDifference < minDifference) {
        minDifference = totalDifference;
        closestSizeX = sizeX;
        closestSizeY = sizeY;
      }
    }
    return { closestSizeX, closestSizeY };
  }

  async getObject(response: Response, objectKey: string) {
    const resource = await this.resourceService.getChildResourceByObjectkey(objectKey);
    if (!resource) throw new HttpException({ message: 'file not found' }, HttpStatus.NOT_FOUND);
    response.setHeader('Content-Type', resource.fileType);
    const { Body } = await this.s3Client.send(new GetObjectCommand({
      Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
      Key: resource.objectKey,
    })).catch(error => {
      throw new HttpException({ message: 'not found' }, HttpStatus.NOT_FOUND);
    });
    return { body: Body as Readable, resource };
  }
}
