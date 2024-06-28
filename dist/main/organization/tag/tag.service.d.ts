import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ICreateTag, IFindAllTag, IRemoveTag, IUpdateTag } from 'src/main/organization/tag/tag.@types';
export declare class TagService {
    private readonly prisma;
    private readonly l;
    constructor(prisma: PrismaService, l: LogService);
    create({ body: { name }, lang, user, param: { organizationId } }: ICreateTag): Promise<{
        message: string;
    }>;
    findAll({ lang, query, user, param: { organizationId } }: IFindAllTag): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            id: string;
            name: string;
        }[];
    }>;
    update({ body: { name }, lang, param: { id }, user }: IUpdateTag): Promise<{
        message: string;
    }>;
    remove({ lang, param: { id }, user }: IRemoveTag): Promise<{
        message: string;
    }>;
}
