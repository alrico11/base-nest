import { z } from "zod";
declare const CreateTagBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>>;
export declare class CreateTagBodyDto extends CreateTagBodyDto_base {
}
declare const FindAllTagQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    orderBy: "createdAt";
    orderDirection: "asc" | "desc";
    search?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    orderBy?: "createdAt" | undefined;
    orderDirection?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>>;
export declare class FindAllTagQueryDto extends FindAllTagQueryDto_base {
}
declare const UpdateTagBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>>;
export declare class UpdateTagBodyDto extends UpdateTagBodyDto_base {
}
declare const UpdateTagParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class UpdateTagParamDto extends UpdateTagParamDto_base {
}
declare const DeleteTagParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class DeleteTagParamDto extends DeleteTagParamDto_base {
}
export {};
