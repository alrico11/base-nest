import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { IFindByIdProject } from "./project.@types";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProjectRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findById({ projectId, organizationId }: IFindByIdProject) {
        let where: Prisma.ProjectWhereInput = { id: projectId, deletedAt: null }
        if (organizationId) where = { ...where, organizationId }
        return await this.prisma.project.findFirst({ where })
    }
}