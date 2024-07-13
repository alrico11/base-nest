import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { LangEnum, LangResponse } from "src/constants";
import { XConfig } from "src/xconfig";
import { OrganizationService } from "./organization.service";

@Injectable()
export class MemberGuard implements CanActivate {
    constructor(
        private readonly config: XConfig,
        private readonly organizationService: OrganizationService
    ) { }
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const organizationId = request.params.organizationId
        const lang = request.headers['x-accept-lang'] ? request.headers['x-accept-lang'] : LangEnum.EN
        const token = request.headers?.authorization?.split(' ')[1];
        const decoded: any = verify(token, this.config.env.USER_JWT_SECRET)
        const isMember = await this.organizationService.memberGuard({ lang, organizationId, userId: decoded.id })
        if (!isMember) throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        return true
    }
}