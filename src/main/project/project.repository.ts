import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma";
import { IFindByIdProject, IFindCollaborator } from "./project.@types";

@Injectable()
export class ProjectRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findById({ projectId }: IFindByIdProject) {
        let where: Prisma.ProjectWhereInput = { id: projectId, deletedAt: null, organizationId: null }
        return await this.prisma.project.findFirst({ where, include: { ProjectCollaborators: true } })
    }
    async findCollaborator({ projectId, organizationId }: IFindCollaborator) {
        let where: Prisma.ProjectWhereInput = { id: projectId, deletedAt: null }
        if (organizationId) where = { ...where, organizationId }
        return await this.prisma.project.findFirst({
            where, include: {
                ProjectCollaborators: { include: { User: { include: { UserDevice: { include: { Device: true } } } } } }
            }
        })
    }
}