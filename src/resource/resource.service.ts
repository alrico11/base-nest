import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common/decorators';
import { Resource } from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';
import { PrismaService } from '../prisma/prisma.service';
import { AddResourceInput } from './resource.@types';
import { XConfig } from 'src/xconfig';

@Injectable()
export class ResourceService {
  private s3Client: S3Client
  constructor(
    private readonly config: XConfig,
    private readonly prisma: PrismaService,
  ) {
    this.s3Client = new S3Client({
      region: this.config.env.OBJECT_STORAGE_REGION || 'localhost',
      credentials: {
        accessKeyId: this.config.env.OBJECT_STORAGE_ACCESS_KEY_ID,
        secretAccessKey: this.config.env.OBJECT_STORAGE_SECRET_ACCESS_KEY
      },
      endpoint: this.config.env.OBJECT_STORAGE_ENDPOINT,
      forcePathStyle : this.config.env.OBJECT_STORAGE_FORCE_PATH_STYLE
    })
  }
  async add(objectStorageInfo: AddResourceInput) {
    const { objectKey } = objectStorageInfo
    const resource = await this.prisma.resource.findFirst({
      where: { objectKey }
    })
    if (resource) return resource
    const newResource = await this.prisma.resource.create({
      data: {
        ...objectStorageInfo,
        createdAt: dayjs().toDate()
      }
    })
    return newResource
  }

  async getResource(param: string) {
    if (z.string().uuid().safeParse(param).success)
      return await this.prisma.resource.findFirst({
        where: { id: param, deletedAt: null },
      })
    return await this.prisma.resource.findFirst({
      where: { fileName: param, deletedAt: null }
    })
  }

  async getResourceByObjectkey(objectKey: string) {
    return await this.prisma.resource.findFirst({
      where: {
        objectKey
      },
    })
  }

  async getChildResourceByObjectkey(objectKey: string) {
    return await this.prisma.resource.findFirst({
      where: {
        objectKey
      },
      include: {
        childResources: true
      }
    })
  }

  async removeObjectFromStorage(resource: Resource | Resource[]) {
    const resources = Array.isArray(resource) ? resource : [resource];
    const deletePromises = resources.map(({ objectKey }) => {
      this.s3Client.send(new DeleteObjectCommand({
        Bucket: this.config.env.OBJECT_STORAGE_BUCKET,
        Key: objectKey,
      }))
    }
    );
    await Promise.all(deletePromises);
  }

  async updateObjectUrl(resource: Resource | Resource[]) {
    const resources = Array.isArray(resource) ? resource : [resource];
    const updateOperations = resources.map((res) => {
      return this.prisma.resource.update({
        where: { id: res.id },
        data: { objectUrl: res.objectUrl },
      });
    });
    await this.prisma.$transaction(updateOperations);
  }

  async deleteResource(resource: Resource | Resource[]) {
    const resources = Array.isArray(resource) ? resource : [resource];
    const deleteOperations = resources.map(res => {
      return this.prisma.resource.delete({
        where: { id: res.id },
      });
    });
    await this.prisma.$transaction(deleteOperations);
  }

}
