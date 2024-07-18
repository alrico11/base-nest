import { Project, ProjectCollaborator, User } from "@prisma/client";
import { LangEnum } from "src/constants";
import { CreateReminderBodyDtoSchema, CreateTaskBodyDto, CreateTaskParamDto, DeleteTaskParamDto, FindAllTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from "./task.dto";
import { z } from "zod";

export type ReminderType = z.infer<typeof CreateReminderBodyDtoSchema>;

export interface ICreateTask {
    user: User
    lang: LangEnum
    body: CreateTaskBodyDto
    param?: CreateTaskParamDto
}

export interface IUpdateTask {
    body: UpdateTaskBodyDto
    param: UpdateTaskParamDto
    lang: LangEnum
    user: User
}

export interface IResource {
    resourceId: string
    taskId: string
}

export interface IRemoveTask {
    param: DeleteTaskParamDto
    user: User
    lang: LangEnum
}

export interface IFindAllTask {
    query: FindAllTaskQueryDto
    lang: LangEnum
    user: User
    param? : FindAllTaskParamDto
}

export interface IFindOneTask {
    param: FindOneTaskParamDto
    user: User
    lang: LangEnum
}
