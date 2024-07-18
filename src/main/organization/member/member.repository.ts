import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { Prisma } from "@prisma/client";
import { ICreateManyMember } from "./member.@types";

@Injectable()
export class MemberRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async createManyMember({ userIds, organizationId, addedById }: ICreateManyMember) {
        const data: Prisma.OrganizationMemberCreateManyInput[] = userIds.map((userId) => {
            return {
                userId,
                addedById,
                organizationId
            }
        })
        return await this.prisma.organizationMember.createMany({ data })
    }
}