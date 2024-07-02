import { z } from "zod";
declare const CreateProjectBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodNumber>;
    goals: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<{
        NEW: "NEW";
        IN_PROGRESS: "IN_PROGRESS";
        POSTPONED: "POSTPONED";
        WAITING_APPROVAL: "WAITING_APPROVAL";
        DONE: "DONE";
        CANCELLED: "CANCELLED";
    }>;
    thumbnail: z.ZodOptional<z.ZodString>;
    groupId: z.ZodOptional<z.ZodString>;
    file: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    name: string;
    priority: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
    color?: string | undefined;
    target?: string | undefined;
    budget?: number | undefined;
    goals?: string | undefined;
    file?: string[] | undefined;
    groupId?: string | undefined;
}, {
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    name: string;
    priority: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
    color?: string | undefined;
    target?: string | undefined;
    budget?: number | undefined;
    goals?: string | undefined;
    file?: string[] | undefined;
    groupId?: string | undefined;
}>>;
export declare class CreateProjectBodyDto extends CreateProjectBodyDto_base {
}
declare const FindAllProjectQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderBy: "createdAt";
    page: number;
    limit: number;
    orderDirection: "asc" | "desc";
    search?: string | undefined;
}, {
    orderBy?: "createdAt" | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    orderDirection?: "asc" | "desc" | undefined;
}>>;
export declare class FindAllProjectQueryDto extends FindAllProjectQueryDto_base {
}
declare const FindOneProjectParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class FindOneProjectParamDto extends FindOneProjectParamDto_base {
}
declare const UpdateProjectParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class UpdateProjectParamDto extends UpdateProjectParamDto_base {
}
declare const UpdateProjectBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    color: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    priority: z.ZodString;
    target: z.ZodOptional<z.ZodString>;
    budget: z.ZodOptional<z.ZodNumber>;
    goals: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<{
        NEW: "NEW";
        IN_PROGRESS: "IN_PROGRESS";
        POSTPONED: "POSTPONED";
        WAITING_APPROVAL: "WAITING_APPROVAL";
        DONE: "DONE";
        CANCELLED: "CANCELLED";
    }>;
    thumbnail: z.ZodOptional<z.ZodString>;
    groupId: z.ZodOptional<z.ZodString>;
    file: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    name: string;
    priority: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
    color?: string | undefined;
    target?: string | undefined;
    budget?: number | undefined;
    goals?: string | undefined;
    file?: string[] | undefined;
    groupId?: string | undefined;
}, {
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    name: string;
    priority: string;
    description?: string | undefined;
    thumbnail?: string | undefined;
    color?: string | undefined;
    target?: string | undefined;
    budget?: number | undefined;
    goals?: string | undefined;
    file?: string[] | undefined;
    groupId?: string | undefined;
}>>;
export declare class UpdateProjectBodyDto extends UpdateProjectBodyDto_base {
}
declare const DeleteProjectParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class DeleteProjectParamDto extends DeleteProjectParamDto_base {
}
declare const CreateProjectParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class CreateProjectParamDto extends CreateProjectParamDto_base {
}
declare const FindAllProjectCollaboratorParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class FindAllProjectCollaboratorParamDto extends FindAllProjectCollaboratorParamDto_base {
}
declare const FindAllProjectCollaboratorQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderBy: "createdAt";
    page: number;
    limit: number;
    orderDirection: "asc" | "desc";
    search?: string | undefined;
}, {
    orderBy?: "createdAt" | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    orderDirection?: "asc" | "desc" | undefined;
}>>;
export declare class FindAllProjectCollaboratorQueryDto extends FindAllProjectCollaboratorQueryDto_base {
}
export {};
