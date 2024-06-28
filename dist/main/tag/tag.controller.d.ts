import { TagService } from './tag.service';
import { LangEnum } from 'src/constants';
import { CreateTagBodyDto, DeleteTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { User } from '@prisma/client';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(body: CreateTagBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAll(query: FindAllTagQueryDto, lang: LangEnum, user: User): Promise<{
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
    update(param: UpdateTagParamDto, body: UpdateTagBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    remove(param: DeleteTagParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
}
