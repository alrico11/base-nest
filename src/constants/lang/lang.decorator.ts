import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { LangEnum } from './lang.@types';

export const Lang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const lang: LangEnum = request.headers['x-accept-lang']
    return lang ? lang : "EN"
  },
);