import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { IFindMemberInOrganization, IFindOrganizationById } from "./organization.@types";

@Injectable()
export class OrganizationRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async findById({ organizationId }: IFindOrganizationById) {
        return await this.prisma.organization.findFirst({ where: { id: organizationId }, include: { OrganizationMembers: true } })
    }

    async findMemberInOrganization({ organizationId }: IFindMemberInOrganization) {
        const organization = await this.prisma.organization.findFirst({
            where: { id: organizationId },
            include: { OrganizationMembers: { include: { User: { include: { UserDevice: { include: { Device: true } } } } } } }
        })
        // if (organization) {
        //     const { OrganizationMembers } = organization;
        //     return OrganizationMembers.flatMap(({ User }) => {
        //         const { UserDevice } = User;
        //         return UserDevice.map(({ Device }) => Device.fcmToken);
        //     });
        // }
        return organization
    }
}