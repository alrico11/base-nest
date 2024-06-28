import { z } from 'zod';
export declare const RegisterDeviceDtoBodySchema: z.ZodObject<{
    fingerprint: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    fingerprint: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    fingerprint: string;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const CheckDeviceDtoBodySchema: z.ZodObject<{
    id: z.ZodString;
    fingerprint: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fingerprint: string;
    id: string;
}, {
    fingerprint: string;
    id: string;
}>;
export declare const RegisterFCMTokenDtoBodySchema: z.ZodObject<{
    deviceToken: z.ZodString;
    fcmToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deviceToken: string;
    fcmToken: string;
}, {
    deviceToken: string;
    fcmToken: string;
}>;
declare const RegisterDeviceBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    fingerprint: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    fingerprint: string;
    metadata?: Record<string, unknown> | undefined;
}, {
    fingerprint: string;
    metadata?: Record<string, unknown> | undefined;
}>>;
export declare class RegisterDeviceBodyDto extends RegisterDeviceBodyDto_base {
}
declare const CheckDeviceBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    id: z.ZodString;
    fingerprint: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fingerprint: string;
    id: string;
}, {
    fingerprint: string;
    id: string;
}>>;
export declare class CheckDeviceBodyDto extends CheckDeviceBodyDto_base {
}
declare const RegisterFCMTokenBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    deviceToken: z.ZodString;
    fcmToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    deviceToken: string;
    fcmToken: string;
}, {
    deviceToken: string;
    fcmToken: string;
}>>;
export declare class RegisterFCMTokenBodyDto extends RegisterFCMTokenBodyDto_base {
}
export {};
