import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { FirebaseService } from 'src/firebase/firebase.service';

import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ILoginDto, ILogOutDto } from './auth.@types';
import { XConfig } from 'src/xconfig';
import { LangResponse } from 'src/constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: XConfig,
    private readonly firebase: FirebaseService,
    private readonly l: LogService
  ) { this.l.setContext(`MAIN ${AuthService.name}`) }
  async login({ body, device, lang }: ILoginDto) {
    const { email, firebaseIdToken, password } = body
    if (firebaseIdToken) {
      const decodedId = await this.firebase
        .verifyToken(firebaseIdToken)
        .catch((error) => {
          throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED);
        });
      this.l.error({
        message: `user login failed with firebase id ${firebaseIdToken}`,
      })
      if (decodedId.email === null) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED);
      const user = await this.prisma.user.findFirst({
        where: { deletedAt: null, email: decodedId?.email },
      });
    }
    if (!email || !password) throw new HttpException(LangResponse({ key: "badRequest", lang }), HttpStatus.BAD_REQUEST)
    const existUser = await this.prisma.user.findFirst({
      where: { deletedAt: null, email: email.toLowerCase() },
    });
    if (!existUser) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED);
    if (!existUser.password) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED);
    const match = await compare(password, existUser.password);
    console.log(match)
    if (!match) throw new HttpException(LangResponse({ key: "unauthorize", lang }), HttpStatus.UNAUTHORIZED);
    const { USER_JWT_SECRET } = this.config.env;
    const token = sign({ id: existUser.id }, USER_JWT_SECRET, {});
    const user = await this.prisma.authToken.create({
      data: {
        userId: existUser.id,
        token: token,
        deviceId: device.id,
      },
    });
    this.l.info({
      message: `user login successfuly with id ${user.id} & token ${token}`,
    })
    return {
      message: LangResponse({ key: "success", lang, object: "login" }),
      data: { id: existUser.id, token: token },
    };
  }
  async logout({ device, lang, user }: ILogOutDto) {
    await this.prisma.authToken.deleteMany({
      where: {
        userId: user.id,
        deviceId: device.id
      }
    })
    this.l.info({
      message: `user logout successfuly with id ${user.id}`,
      data: user
    })
    return ({ message: LangResponse({ lang, key: "success", object: "logout" }) })
  }
}
