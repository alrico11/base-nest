import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

const NotificationQuerySchema = z.object({
    page : z.number({coerce : true}).default(1),
    limit : z.number({coerce : true}).default(10)
})

const NotificationParamSchema = z.object({
    notificationId : z.string().uuid()
})


export class NotificationQueryDto extends createZodDto(NotificationQuerySchema){}
export class NotificationParamDto extends createZodDto(NotificationParamSchema){}