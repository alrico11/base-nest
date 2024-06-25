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
            user: {
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
            fcmToken: {
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
            user: {
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
            fcmToken: {
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
