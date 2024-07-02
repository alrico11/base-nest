import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";

const CreateUserBodyDtoSchema = z.object({
    username: z.string(),
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
    phone: z.string().min(10),
    cityId: z.string()
})

export class CreateUserBodyDto extends createZodDto(CreateUserBodyDtoSchema) { }