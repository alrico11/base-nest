import { z } from "zod";

export const FindOneParamDtoBaseSchema = z.object({
    id : z.string().uuid()
})