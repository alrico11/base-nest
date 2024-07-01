import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly config;
    private extendedClient;
    constructor(config: ConfigService);
    get extended(): import("@prisma/client/runtime/library").DynamicClientExtensionThis<Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
        result: {};
        model: {
            $allModels: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            log: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            user: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            firebase: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            admin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            authToken: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            authTokenAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            userResetToken: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            deviceAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            device: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            userDevice: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            notification: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            resource: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            project: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectTag: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            tag: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectCollaborator: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectImage: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectFile: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectNote: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            eventLog: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            task: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskComment: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskFile: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskAssignee: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskPrequisite: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskImage: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            note: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            noteProject: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            noteOrganization: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            comment: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminder: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminderTask: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminderNote: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chat: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoom: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatDeleted: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatResource: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoomProject: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoomPrivate: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organization: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organizationMember: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organizationAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            departement: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            position: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            job: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            sop: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            city: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            province: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            district: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            subDistrict: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
        };
        query: {};
        client: {};
    }>, Prisma.TypeMapCb, {
        result: {};
        model: {
            $allModels: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            log: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            user: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            firebase: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            admin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            authToken: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            authTokenAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            userResetToken: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            deviceAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            device: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            userDevice: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            notification: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            resource: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            project: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectTag: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            tag: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectCollaborator: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectImage: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectFile: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            projectNote: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            eventLog: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            task: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskComment: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskFile: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskAssignee: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskPrequisite: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            taskImage: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            note: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            noteProject: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            noteOrganization: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            comment: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminder: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminderTask: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            reminderNote: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chat: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoom: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatDeleted: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatResource: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoomProject: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            chatRoomPrivate: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organization: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organizationMember: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            organizationAdmin: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            departement: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            position: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            job: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            sop: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            city: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            province: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            district: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
            subDistrict: {
                paginate: () => {
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args> & import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                    <Model, Args>(this: Model, args: import("prisma-paginate/dist/prisma/PrismaFindManyArgs").PrismaFindManyArgs<Model, Args>, paginationArgs: import("prisma-paginate/dist/prisma/PrismaPaginationArgs").PrismaPaginationArgs): import("prisma-paginate/dist/prisma/PrismaPaginateResult").PrismaPaginateResult<Model, Args>;
                };
                getTableName: () => <T>(this: T) => Promise<any>;
            };
        };
        query: {};
        client: {};
    }>;
    private extendClient;
    onModuleInit(): Promise<void>;
}
