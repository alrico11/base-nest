import { z } from "zod";
declare const CreateUserBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    repeatPassword: z.ZodString;
    phone: z.ZodString;
    cityId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    username: string;
    phone: string;
    cityId: string;
    repeatPassword: string;
}, {
    name: string;
    email: string;
    password: string;
    username: string;
    phone: string;
    cityId: string;
    repeatPassword: string;
}>>;
export declare class CreateUserBodyDto extends CreateUserBodyDto_base {
}
export {};
