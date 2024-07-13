import { ExecutionContext } from "@nestjs/common"
import { MethodEnum } from "@prisma/client"

export interface LogOptions { level: number }

export interface LogInterface {
    data: object,
    oldData?: object, 
    newData?: object, 
    method: MethodEnum, 
    projectId?: string
    organizationId?: string,
    userId?:string
}

export interface ISaveLog {
    data: Error | object, 
    level : LogOptions, 
    method?: MethodEnum,
    info?: object,
    projectId?: string
    organizationId?: string,
    userId?:string
}