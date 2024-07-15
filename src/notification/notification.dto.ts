import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { z } from "zod";

const NotificationQuerySchema = FindAllQueryDtoBaseSchema
const NotificationParamSchema = z.object({
    notificationId: z.string().uuid()
})


export class NotificationQueryDto extends createZodDto(NotificationQuerySchema) { }
export class NotificationParamDto extends createZodDto(NotificationParamSchema) { }