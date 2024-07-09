
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const zEnvValidationSchema = z.object({
    NODE_ENV: z.enum(['PRODUCTION', 'DEVELOPMENT', 'LOCAL']),
    APP_PORT: z.number({ coerce: true }).min(1000),
    DATABASE_URL: z.string(),
    USER_JWT_SECRET: z.string(),
    DEVICE_JWT_SECRET: z.string(),
    OBJECT_STORAGE_HOST: z.string(),
    OBJECT_STORAGE_PORT: z.string(),
    OBJECT_STORAGE_REGION: z.string(),
    OBJECT_STORAGE_BUCKET: z.string(),
    OBJECT_STORAGE_ACCESS_KEY_ID: z.string(),
    OBJECT_STORAGE_SECRET_ACCESS_KEY: z.string(),
    OBJECT_STORAGE_FORCE_PATH_STYLE: z.boolean({ coerce: true }),
    OBJECT_STORAGE_ENDPOINT: z.string(),
    DEFAULT_IMAGE_COMPRESSION_WIDTH: z.number({ coerce: true }),
    DEFAULT_IMAGE_COMPRESSION_HEIGHT: z.number({ coerce: true }),
    OBJECT_STORAGE_PREFIX_USER: z.string(),
    OBJECT_STORAGE_PREFIX_ORGANIZATION: z.string(),
    OBJECT_STORAGE_PREFIX_PROJECT: z.string(),
    OBJECT_STORAGE_PREFIX_PROJECT_FILE: z.string(),
    OBJECT_STORAGE_PREFIX_TASK: z.string(),
    OBJECT_STORAGE_PREFIX_ADMIN: z.string(),
    TMP_FILE_PATH: z.string(),
    CDN_PATH_URL: z.string(),
    CDN_MAIN_URL: z.string(),
    CDN_BASE_URL: z.string(),
    BLURHASH_COMPONENT_X: z.number({ coerce: true }),
    BLURHASH_COMPONENT_Y: z.number({ coerce: true }),
    MAX_CHILD_RESOURCE: z.number({ coerce: true }),
    USER_RESET_TOKEN_EXPIRY: z.number({ coerce: true }),
    EMAIL_ADDRESS : z.string(),
    EMAIL_PASSWORD : z.string(),
})

export type IXConfig = z.infer<typeof zEnvValidationSchema>
export type Env = IXConfig

@Injectable()
export class XConfig {
    public env: Env

    constructor(private readonly configService: ConfigService) {
        this.env = new Proxy(({}) as Env, {
            get: (_, prop: keyof IXConfig) => {
                if (zEnvValidationSchema.keyof()._def.values.includes(prop)) return this.configService.get(prop)
                throw new Error(`Property '${prop}' does not exist in XConfig.`)
            },
        })
    }

    public static validate(env: unknown) {
        try {
            return zEnvValidationSchema.parse(env)
        } catch (error) {
            console.error(error)
            // process.exit(1)
            throw error
        }
    }
}
