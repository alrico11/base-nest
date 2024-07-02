import { z } from "zod";
declare const CreateOrganizationBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
}>>;
export declare class CreateOrganizationBodyDto extends CreateOrganizationBodyDto_base {
}
declare const FindAllOrganizationQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
export declare class FindAllOrganizationQueryDto extends FindAllOrganizationQueryDto_base {
}
declare const FindOneOrganizationParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class FindOneOrganizationParamDto extends FindOneOrganizationParamDto_base {
}
declare const UpdateOrganizationParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class UpdateOrganizationParamDto extends UpdateOrganizationParamDto_base {
}
declare const UpdateOrganizationBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    thumbnail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
}>>;
export declare class UpdateOrganizationBodyDto extends UpdateOrganizationBodyDto_base {
}
declare const DeleteOrganizationParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class DeleteOrganizationParamDto extends DeleteOrganizationParamDto_base {
}
declare const FindAllMemberOrganizationQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
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
export declare class FindAllMemberOrganizationQueryDto extends FindAllMemberOrganizationQueryDto_base {
}
declare const FindAllMemberOrganizationParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class FindAllMemberOrganizationParamDto extends FindAllMemberOrganizationParamDto_base {
}
export {};
