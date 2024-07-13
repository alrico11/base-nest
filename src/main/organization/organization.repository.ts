import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { IFindOrganizationById } from "./organization.@types";

@Injectable()
export class OrganizationRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findById({ organizationId }: IFindOrganizationById) {
        return await this.prisma.organization.findFirst({ where: { id: organizationId } })
    }
}