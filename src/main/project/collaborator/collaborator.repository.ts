import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { ICreateManyCollaborator } from "./collaborator.@types";
import { Prisma } from "@prisma/client";

@Injectable()
export class CollaboratorRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async createManyCollaborator({ userIds, projectId, addedById }: ICreateManyCollaborator) {
        const data: Prisma.ProjectCollaboratorCreateManyInput[] = userIds.map((userId) => {
            return {
                userId,
                addedById,
                projectId
            }
        })
        return await this.prisma.projectCollaborator.createMany({ data })
    }
}