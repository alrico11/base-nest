import { z } from "zod";
declare const NotificationQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>>;
export declare class NotificationQueryDto extends NotificationQueryDto_base {
}
declare const NotificationParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    notificationId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    notificationId: string;
}, {
    notificationId: string;
}>>;
export declare class NotificationParamDto extends NotificationParamDto_base {
}
export {};
