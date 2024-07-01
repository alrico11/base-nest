import { ProjectService } from './project.service';
import { CreateProjectBodyDto, DeleteProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto, UpdateProjectBodyDto } from './project.dto';
import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(body: CreateProjectBodyDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    findAll(query: FindAllProjectQueryDto, user: User, lang: LangEnum): Promise<{
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
    findOne(param: FindOneProjectParamDto, user: User, lang: LangEnum): Promise<{
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
    update(body: UpdateProjectBodyDto, param: UpdateProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    remove(param: DeleteProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
}
