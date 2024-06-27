import { createZodDto } from "@anatine/zod-nestjs";
import { object, z } from "zod";

const GetFileParamDtoSchema = z.object({
    fileName : z.string(),
    userId : z.string()
})

const GetImageQueryDtoSchema = z.object({
    width : z.number({coerce : true}).optional(),
    height : z.number({coerce : true}).optional()
})

const GetImageParamDtoSchema = z.object({
    fileName : z.string(),
    prefix : z.string()
})

export class GetImageParamDto extends createZodDto(GetImageParamDtoSchema) {}
export class GetImageQueryDto extends createZodDto(GetImageQueryDtoSchema) {}
export class GetFileParamDto extends createZodDto(GetFileParamDtoSchema){}