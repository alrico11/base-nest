import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { CreateProjectBodyDto, DeleteProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectBodyDto, UpdateProjectParamDto } from './project.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(body: CreateProjectBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    findAll(query: FindAllProjectQueryDto, lang: LangEnum, user: User): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            name: string;
            totalProject: number;
            priority: string;
            teams: {
                userId: string;
                username: string;
                thumbnail: string | undefined;
            }[];
        }[];
    }>;
    findOne(param: FindOneProjectParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
        data: {
            detailsProject: {
                id: string;
                name: string;
            };
            collaboarators: {
                userId: string;
                username: string;
                thumbnail: string | undefined;
                blurHash: string | undefined;
            }[];
        };
    }>;
    update(param: UpdateProjectParamDto, body: UpdateProjectBodyDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
    remove(param: DeleteProjectParamDto, lang: LangEnum, user: User): Promise<{
        message: string;
    }>;
}
