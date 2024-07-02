import { User } from '@prisma/client';
import { LangEnum } from 'src/constants';
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectCollaboratorParamDto, FindAllProjectCollaboratorQueryDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto } from './project.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(body: CreateProjectBodyDto, param: CreateProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    findAll(query: FindAllProjectQueryDto, param: FindAllProjectParamDto, user: User, lang: LangEnum): Promise<{
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
            teams: ({
                userId: string;
                name: string;
                thumbnail: string | undefined;
            } | {
                userId: string;
                name: string;
                thumbnail: string | undefined;
                blurHash: string | null | undefined;
            })[];
        }[];
    }>;
    findOne(param: FindOneProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
        data: {
            detailsProject: {
                id: string;
                name: string;
                totalTask: number;
            };
            detailUser: {
                userId: string;
                name: string;
                role: any;
            };
        };
    }>;
    update(body: CreateProjectBodyDto, param: UpdateProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    remove(param: DeleteProjectParamDto, user: User, lang: LangEnum): Promise<{
        message: string;
    }>;
    findAllCollaborator(query: FindAllProjectCollaboratorQueryDto, lang: LangEnum, param: FindAllProjectCollaboratorParamDto): Promise<{
        limit: number;
        page: number;
        count: number;
        exceedCount: boolean;
        exceedTotalPages: boolean;
        message: string;
        data: {
            length: number;
            toString(): string;
            toLocaleString(): string;
            toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
            pop(): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            } | undefined;
            push(...items: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]): number;
            concat(...items: ConcatArray<{
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>[]): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            concat(...items: ({
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            } | ConcatArray<{
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>)[]): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            join(separator?: string): string;
            reverse(): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            shift(): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            } | undefined;
            slice(start?: number, end?: number): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            sort(compareFn?: ((a: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, b: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }) => number) | undefined): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            splice(start: number, deleteCount?: number): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            splice(start: number, deleteCount: number, ...items: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            unshift(...items: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]): number;
            indexOf(searchElement: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, fromIndex?: number): number;
            lastIndexOf(searchElement: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, fromIndex?: number): number;
            every<S extends {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => value is S, thisArg?: any): this is S[];
            every(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => unknown, thisArg?: any): boolean;
            some(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => unknown, thisArg?: any): boolean;
            forEach(callbackfn: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => void, thisArg?: any): void;
            map<U>(callbackfn: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => U, thisArg?: any): U[];
            filter<S extends {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => value is S, thisArg?: any): S[];
            filter(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => unknown, thisArg?: any): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            reduce(callbackfn: (previousValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            };
            reduce(callbackfn: (previousValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, initialValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            };
            reduce<U>(callbackfn: (previousValue: U, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => U, initialValue: U): U;
            reduceRight(callbackfn: (previousValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            };
            reduceRight(callbackfn: (previousValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, initialValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            };
            reduceRight<U>(callbackfn: (previousValue: U, currentValue: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, currentIndex: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => U, initialValue: U): U;
            find<S extends {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, obj: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => value is S, thisArg?: any): S | undefined;
            find(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, obj: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => unknown, thisArg?: any): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            } | undefined;
            findIndex(predicate: (value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, obj: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => unknown, thisArg?: any): number;
            fill(value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, start?: number, end?: number): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            copyWithin(target: number, start: number, end?: number): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[];
            entries(): IterableIterator<[number, {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }]>;
            keys(): IterableIterator<number>;
            values(): IterableIterator<{
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>;
            includes(searchElement: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, fromIndex?: number): boolean;
            flatMap<U, This = undefined>(callback: (this: This, value: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }, index: number, array: {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }[]) => U | ReadonlyArray<U>, thisArg?: This | undefined): U[];
            flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
            [Symbol.iterator](): IterableIterator<{
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            }>;
            [Symbol.unscopables]: {
                [x: number]: boolean | undefined;
                length?: boolean | undefined;
                toString?: boolean | undefined;
                toLocaleString?: boolean | undefined;
                pop?: boolean | undefined;
                push?: boolean | undefined;
                concat?: boolean | undefined;
                join?: boolean | undefined;
                reverse?: boolean | undefined;
                shift?: boolean | undefined;
                slice?: boolean | undefined;
                sort?: boolean | undefined;
                splice?: boolean | undefined;
                unshift?: boolean | undefined;
                indexOf?: boolean | undefined;
                lastIndexOf?: boolean | undefined;
                every?: boolean | undefined;
                some?: boolean | undefined;
                forEach?: boolean | undefined;
                map?: boolean | undefined;
                filter?: boolean | undefined;
                reduce?: boolean | undefined;
                reduceRight?: boolean | undefined;
                find?: boolean | undefined;
                findIndex?: boolean | undefined;
                fill?: boolean | undefined;
                copyWithin?: boolean | undefined;
                entries?: boolean | undefined;
                keys?: boolean | undefined;
                values?: boolean | undefined;
                includes?: boolean | undefined;
                flatMap?: boolean | undefined;
                flat?: boolean | undefined;
                [Symbol.iterator]?: boolean | undefined;
                readonly [Symbol.unscopables]?: boolean | undefined;
                at?: boolean | undefined;
            };
            at(index: number): {
                userId: string;
                name: string;
                role: any;
                thumbnail: string | undefined;
                blurhash: string | null | undefined;
                updatedAt: Date;
            } | undefined;
            userId: string;
            name: string;
            thumbnail: string | undefined;
            blurhash: string | null | undefined;
            role: any;
            updatedAt: Date;
        }[];
    }>;
}
