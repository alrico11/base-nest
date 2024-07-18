import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Resource } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import dayjs from 'dayjs';
import { sign, verify } from 'jsonwebtoken';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { dotToObject } from 'src/utils/string';
import { XConfig } from 'src/xconfig';
import { CheckRequestResetPassword, IConfirmChangePassword, ICreateUser, IFindAllUser, IFindOneUser, IRemoveUser, IRequestChangePasswordUser, IUpdateUser } from './user.@types';
import { UserResetPasswordCreatedEvent, UserUpdatedEvent } from './user.event';
import { LogService } from 'src/log';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: XConfig,
    private readonly fileService: FileService,
    private readonly ee: EventEmitter2,
    private readonly l: LogService
  ) { this.l.setContext(UserService.name) }
  async create({ body, device, lang }: ICreateUser) {
    const { email, username, password, repeatPassword, ...rest } = body
    const userExist = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
    if (userExist) throw new HttpException(LangResponse({ key: "alreadRegistered", lang, object: "USER" }), HttpStatus.CONFLICT)
    if (password && repeatPassword && password !== repeatPassword) throw new HttpException(LangResponse({ key: "badRequest", lang }), HttpStatus.BAD_REQUEST)
    const user = await this.prisma.user.create({ data: { email, username, password: hashSync(password, 12), ...rest } })
    const { USER_JWT_SECRET } = this.config.env;
    const token = sign({ id: user.id }, USER_JWT_SECRET, {})
    await this.prisma.authToken.create({ data: { token, deviceId: device.id, userId: user.id } })
    return { message: LangResponse({ key: "created", lang, object: "user" }), statusCode: HttpStatus.CREATED, data: { userId: user.id, email: user.email, token, name: user.name } };
  }

  async findAll({ lang, query }: IFindAllUser) {
    const { limit, orderBy, orderDirection, page, search } = query
    const { result, ...rest } = await this.prisma.extended.user.paginate({
      where: { name: { contains: search, mode: "insensitive" } },
      limit, page,
      include: { Resource: true },
      orderBy: dotToObject({ orderBy, orderDirection })
    })

    const data = result.map(({ id, name, email, Resource }) => {
      return {
        id, name, email,
        thumbnail: Resource ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
        blurHash: Resource ? Resource.blurHash : undefined
      }
    })

    return { message: LangResponse({ key: "fetched", lang, object: "user" }), data: data, ...rest };
  }

  async findOne({ lang, param: { id } }: IFindOneUser) {
    const userExist = await this.prisma.user.findFirst({ where: { id }, include: { Resource: true } })
    if (!userExist) throw new HttpException(LangResponse({ key: "notFound", lang, object: "user" }), HttpStatus.NOT_FOUND)
    const { Resource, name, email, phone, updatedAt } = userExist
    const data = {
      id, name, email, phone, updatedAt,
      thumbnail: Resource && !Array.isArray(Resource) ? this.fileService.cdnUrl({ objectKey: Resource.objectKey }) : undefined,
      blurHash: Resource && !Array.isArray(Resource) ? Resource.blurHash : undefined
    }
    return { message: LangResponse({ key: 'fetched', lang, object: "user" }), data };
  }

  async update({ body, lang, user }: IUpdateUser) {
    const { email, username, password, repeatPassword, newPassword, thumbnail, ...rest } = body
    const { id } = user
    let userExist = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
    if (userExist && userExist.email !== user.email && userExist.username !== user.email) throw new HttpException(LangResponse({ key: "alreadRegistered", lang, object: "USER" }), HttpStatus.CONFLICT)
    const editedUser = await this.prisma.user.findFirst({ where: { id }, include: { Resource: true, Comments: true } })
    if (!editedUser) throw new HttpException(LangResponse({ key: 'notFound', lang, object: "user" }), HttpStatus.NOT_FOUND)
    if (password && repeatPassword && newPassword && user.password) {
      const match = await compare(password, user.password);
      if (!match) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED);
      throw new HttpException(LangResponse({ key: "badRequest", lang }), HttpStatus.BAD_REQUEST)
    }
    let newResource: Resource | Resource[] | undefined
    if (thumbnail) {
      newResource = await this.fileService.handleUploadObjectStorage({ fileName: thumbnail, prefix: this.config.env.OBJECT_STORAGE_PREFIX_USER, user })
      if (editedUser.Resource) {
        const oldResource = editedUser.Resource
        this.ee.emit(UserUpdatedEvent.key, new UserUpdatedEvent({ newResource, oldResource }))
      }
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        email,
        username,
        password: newPassword ? hashSync(newPassword, 12) : undefined,
        thumbnailId: newResource && !Array.isArray(newResource) ? newResource.id : undefined,
        ...rest
      }
    })
    return { message: LangResponse({ key: "updated", lang, object: "user" }) };
  }

  async remove({ lang, user: { id } }: IRemoveUser) {
    await this.prisma.user.update({ where: { id }, data: { deletedAt: dayjs().toDate() } })
    return { message: LangResponse({ key: "deleted", lang, object: "user" }) };
  }


  async checkRequestPassword({ lang, param: { token } }: CheckRequestResetPassword) {
    const decodedJwt = verify(token, this.config.env.USER_JWT_SECRET);
    if (!decodedJwt) throw new HttpException("token invalid", HttpStatus.FORBIDDEN);
    return { message: LangResponse({ key: "success", lang, object: 'user' }), data: { decodedJwt } };
  }

  async requestResetPassword({ body: { email }, lang }: IRequestChangePasswordUser) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const { id, name } = user
    const { USER_JWT_SECRET } = this.config.env;
    const token = sign({ id, email }, USER_JWT_SECRET);
    await this.prisma.userResetToken.create({ data: { id: token, userId: user.id } })
    const expiry = dayjs().add(this.config.env.USER_RESET_TOKEN_EXPIRY, 'm').diff(dayjs(), 'ms');
    this.ee.emit(UserResetPasswordCreatedEvent.key, new UserResetPasswordCreatedEvent({ user, expiry, token }))
    return { message: LangResponse({ key: "mailSuccess", lang, object: "user" }), data: { userId: id, email: user.email } };
  }

  async confirmChangePassword({ body: { confirmPassword, password, userId }, device, param: { token }, lang }: IConfirmChangePassword) {
    if (password != confirmPassword) throw new HttpException(LangResponse({ key: "badRequest", lang, object: "user" }), HttpStatus.FORBIDDEN);
    const tokenExist = await this.prisma.userResetToken.findFirst({ where: { id: token } })
    if (!tokenExist) throw new HttpException("invalid token", HttpStatus.BAD_REQUEST)
    await this.prisma.$transaction(async (prisma) => {
      await prisma.userResetToken.update({ where: { id: token, userId }, data: { usedAt: dayjs().toISOString() } })
      await prisma.user.update({
        where: { id: userId, },
        data: { password: hashSync(password, 12) },
      });
      await prisma.userDevice.deleteMany({
        where: { userId: userId, NOT: { deviceId: device.id } }
      });
    });
    return { message: LangResponse({ key: "success", lang }) };
  }
}
