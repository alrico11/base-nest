import { z } from "zod";
declare const CreateProjectCollaboratorBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>>;
export declare class CreateProjectCollaboratorBodyDto extends CreateProjectCollaboratorBodyDto_base {
}
declare const CreateProjectCollaboratorParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
}, {
    organizationId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
}, {
    id: string;
    organizationId: string;
}>>;
export declare class CreateProjectCollaboratorParamDto extends CreateProjectCollaboratorParamDto_base {
}
declare const RemoveProjectCollaboratorBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>>;
export declare class RemoveProjectCollaboratorBodyDto extends RemoveProjectCollaboratorBodyDto_base {
}
declare const RemoveProjectCollaboratorParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
}, {
    organizationId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
}, {
    id: string;
    organizationId: string;
}>>;
export declare class RemoveProjectCollaboratorParamDto extends RemoveProjectCollaboratorParamDto_base {
}
declare const AddAdminProjectCollaboratorBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>>;
export declare class AddAdminProjectCollaboratorBodyDto extends AddAdminProjectCollaboratorBodyDto_base {
}
declare const AddAdminProjectCollaboratorParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
}, {
    organizationId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
}, {
    id: string;
    organizationId: string;
}>>;
export declare class AddAdminProjectCollaboratorParamDto extends AddAdminProjectCollaboratorParamDto_base {
}
declare const RemoveAdminProjectCollaboratorBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
}, {
    userId: string;
}>>;
export declare class RemoveAdminProjectCollaboratorBodyDto extends RemoveAdminProjectCollaboratorBodyDto_base {
}
declare const RemoveAdminProjectCollaboratorParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<z.objectUtil.extendShape<{
    id: z.ZodString;
}, {
    organizationId: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id: string;
    organizationId: string;
}, {
    id: string;
    organizationId: string;
}>>;
export declare class RemoveAdminProjectCollaboratorParamDto extends RemoveAdminProjectCollaboratorParamDto_base {
}
export {};
