import { z } from "zod";
declare const GetImageParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    fileName: z.ZodString;
    prefix: z.ZodString;
}, "strip", z.ZodTypeAny, {
    fileName: string;
    prefix: string;
}, {
    fileName: string;
    prefix: string;
}>>;
export declare class GetImageParamDto extends GetImageParamDto_base {
}
declare const GetImageQueryDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    width?: number | undefined;
    height?: number | undefined;
}, {
    width?: number | undefined;
    height?: number | undefined;
}>>;
export declare class GetImageQueryDto extends GetImageQueryDto_base {
}
declare const GetFileParamDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    fileName: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    fileName: string;
}, {
    userId: string;
    fileName: string;
}>>;
export declare class GetFileParamDto extends GetFileParamDto_base {
}
export {};
