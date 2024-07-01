import { User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateTaskBodyDto, DeleteTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from "./task.dto";
export interface ICreateTask {
    user: User;
    lang: LangEnum;
    body: CreateTaskBodyDto;
}
export interface IUpdateTask {
    body: UpdateTaskBodyDto;
    param: UpdateTaskParamDto;
    lang: LangEnum;
    user: User;
}
export interface IResource {
    resourceId: string;
    taskId: string;
}
export interface IRemoveTask {
    param: DeleteTaskParamDto;
    user: User;
    lang: LangEnum;
}
export interface IFindAllTask {
    query: FindAllTaskQueryDto;
    lang: LangEnum;
    user: User;
}
export interface IFindOneTask {
    param: FindOneTaskParamDto;
    user: User;
    lang: LangEnum;
}
