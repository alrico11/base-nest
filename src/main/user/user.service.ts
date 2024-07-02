import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LangResponse } from 'src/constants';
import { FileService } from 'src/file';
import { PrismaService } from 'src/prisma';
import { XConfig } from 'src/xconfig';
import { ICreateUser } from './user.@types';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: XConfig,
    private readonly fileService: FileService
  ) { }
  async create({ body, device, lang }: ICreateUser) {
    const { email, username, password, repeatPassword, ...rest } = body
    const userExist = await this.prisma.user.findFirst({ where: { OR: [{ email }, { username }] } })
    if (userExist) throw new HttpException(LangResponse({ key: "alreadRegistered", lang, object: "USER" }), HttpStatus.CONFLICT)
    if (password !== repeatPassword) throw new HttpException(LangResponse({ key: "badRequest", lang }), HttpStatus.BAD_REQUEST)
    const user = await this.prisma.user.create({ data: { email, username, password: hashSync(password, 12), ...rest } })
    const { USER_JWT_SECRET } = this.config.env;
    const token = sign({ id: user.id }, USER_JWT_SECRET, {})
    await this.prisma.authToken.create({ data: { token, deviceId: device.id, userId: user.id } })
    return { message: LangResponse({ key: "created", lang, object: "user" }), statusCode: HttpStatus.CREATED, data: { userId: user.id, email: user.email, token, name: user.name } };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
