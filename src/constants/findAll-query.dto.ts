import { z } from "zod";

export const FindAllQueryDtoBaseSchema = z.object({
    page: z.number({ coerce: true }).optional().default(1),
    limit: z.number({ coerce: true }).optional().default(10),
    orderBy: z.enum(['createdAt']).optional().default('createdAt'),
    orderDirection: z.enum(['asc', 'desc']).optional().default('desc'),
    search: z.string().optional()
})