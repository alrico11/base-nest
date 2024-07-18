import { createZodDto } from "@anatine/zod-nestjs";
import { FindAllQueryDtoBaseSchema } from "src/constants/findAll-query.dto";
import { FindOneParamDtoBaseSchema } from "src/constants/findOne-param.dto";
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

const UpdateUserBodyDtoSchema = CreateUserBodyDtoSchema.extend({
    thumbnail: z.string().optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    repeatPassowrd: z.string().optional(),
})

const FindAllUserQueryDtoSchema = FindAllQueryDtoBaseSchema

const FindOneUserParamDtoSchema = FindOneParamDtoBaseSchema

export class CreateUserBodyDto extends createZodDto(CreateUserBodyDtoSchema) { }
export class UpdateUserBodyDto extends createZodDto(UpdateUserBodyDtoSchema) { }
export class FindAllUserQueryDto extends createZodDto(FindAllUserQueryDtoSchema) { }
export class FindOneUserParamDto extends createZodDto(FindOneUserParamDtoSchema) { }

const RequestChangePasswordUserBodyDtoSchema = z.object({ email: z.string().email() })

const ConfirmChangePasswordUserBodyDtoSchema = z.object({
    userId: z.string().min(6),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
})

const ConfirmChangePasswordUserParamDtoSchema = z.object({
    token: z.string(),
})

export class ConfirmChangePasswordUserBodyDto extends createZodDto(ConfirmChangePasswordUserBodyDtoSchema) {}
export class ConfirmChangePasswordUserParamDto extends createZodDto(ConfirmChangePasswordUserParamDtoSchema) {}

export class RequestChangePasswordUserBodyDto extends createZodDto(RequestChangePasswordUserBodyDtoSchema){}
export class CheckRequestPasswordUserParamDto extends createZodDto(ConfirmChangePasswordUserParamDtoSchema) {}

