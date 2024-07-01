import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { CreateTagBodyDto, CreateTagParamDto, DeleteTagParamDto, FindAllTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { TagService } from './tag.service';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(param: CreateTagParamDto, body: CreateTagBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAll(param: FindAllTagParamDto, query: FindAllTagQueryDto, lang: LangEnum, user: User): Promise<{
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
