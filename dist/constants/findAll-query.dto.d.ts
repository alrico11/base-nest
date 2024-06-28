import { z } from "zod";
export declare const FindAllQueryDtoBaseSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    orderDirection: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    orderBy: "createdAt";
    orderDirection: "asc" | "desc";
    page: number;
    limit: number;
    search?: string | undefined;
}, {
    orderBy?: "createdAt" | undefined;
    search?: string | undefined;
    orderDirection?: "asc" | "desc" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
}>;
