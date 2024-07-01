import { z } from "zod";
declare const CreateTaskBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assigneeUserIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<{
        NEW: "NEW";
        IN_PROGRESS: "IN_PROGRESS";
        POSTPONED: "POSTPONED";
        WAITING_APPROVAL: "WAITING_APPROVAL";
        DONE: "DONE";
        CANCELLED: "CANCELLED";
    }>;
    priority: z.ZodNativeEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    color: z.ZodOptional<z.ZodString>;
    duration: z.ZodDefault<z.ZodNumber>;
    projectId: z.ZodOptional<z.ZodString>;
    files: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reminder: z.ZodOptional<z.ZodObject<{
        alarm: z.ZodDefault<z.ZodBoolean>;
        interval: z.ZodNativeEnum<{
            ONCE: "ONCE";
            DAILY: "DAILY";
            WEEKLY: "WEEKLY";
            MONTHLY: "MONTHLY";
        }>;
        startDate: z.ZodDefault<z.ZodEffects<z.ZodString, string, string>>;
        time: z.ZodDefault<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        startDate: string;
        alarm: boolean;
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        time: string;
    }, {
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        startDate?: string | undefined;
        alarm?: boolean | undefined;
        time?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    duration: number;
    description?: string | undefined;
    assigneeUserIds?: string[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    color?: string | undefined;
    projectId?: string | undefined;
    files?: string[] | undefined;
    reminder?: {
        startDate: string;
        alarm: boolean;
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        time: string;
    } | undefined;
}, {
    name: string;
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    description?: string | undefined;
    assigneeUserIds?: string[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    color?: string | undefined;
    duration?: number | undefined;
    projectId?: string | undefined;
    files?: string[] | undefined;
    reminder?: {
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        startDate?: string | undefined;
        alarm?: boolean | undefined;
        time?: string | undefined;
    } | undefined;
}>>;
export declare class CreateTaskBodyDto extends CreateTaskBodyDto_base {
}
declare const UpdateTaskBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assigneeUserIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    status: z.ZodNativeEnum<{
        NEW: "NEW";
        IN_PROGRESS: "IN_PROGRESS";
        POSTPONED: "POSTPONED";
        WAITING_APPROVAL: "WAITING_APPROVAL";
        DONE: "DONE";
        CANCELLED: "CANCELLED";
    }>;
    priority: z.ZodNativeEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    color: z.ZodOptional<z.ZodString>;
    duration: z.ZodDefault<z.ZodNumber>;
    projectId: z.ZodOptional<z.ZodString>;
    files: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reminder: z.ZodOptional<z.ZodObject<{
        alarm: z.ZodDefault<z.ZodBoolean>;
        interval: z.ZodNativeEnum<{
            ONCE: "ONCE";
            DAILY: "DAILY";
            WEEKLY: "WEEKLY";
            MONTHLY: "MONTHLY";
        }>;
        startDate: z.ZodDefault<z.ZodEffects<z.ZodString, string, string>>;
        time: z.ZodDefault<z.ZodEffects<z.ZodString, string, string>>;
    }, "strip", z.ZodTypeAny, {
        startDate: string;
        alarm: boolean;
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        time: string;
    }, {
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        startDate?: string | undefined;
        alarm?: boolean | undefined;
        time?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    duration: number;
    description?: string | undefined;
    assigneeUserIds?: string[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    color?: string | undefined;
    projectId?: string | undefined;
    files?: string[] | undefined;
    reminder?: {
        startDate: string;
        alarm: boolean;
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        time: string;
    } | undefined;
}, {
    name: string;
    status: "NEW" | "IN_PROGRESS" | "POSTPONED" | "WAITING_APPROVAL" | "DONE" | "CANCELLED";
    priority: "LOW" | "MEDIUM" | "HIGH";
    description?: string | undefined;
    assigneeUserIds?: string[] | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    color?: string | undefined;
    duration?: number | undefined;
    projectId?: string | undefined;
    files?: string[] | undefined;
    reminder?: {
        interval: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
        startDate?: string | undefined;
        alarm?: boolean | undefined;
        time?: string | undefined;
    } | undefined;
}>>;
export declare class UpdateTaskBodyDto extends UpdateTaskBodyDto_base {
}
declare const UpdateTaskParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class UpdateTaskParamDto extends UpdateTaskParamDto_base {
}
declare const DeleteTaskParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class DeleteTaskParamDto extends DeleteTaskParamDto_base {
}
declare const FindOneTaskParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>>;
export declare class FindOneTaskParamDto extends FindOneTaskParamDto_base {
}
declare const FindAllTaskQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
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
export declare class FindAllTaskQueryDto extends FindAllTaskQueryDto_base {
}
export {};
