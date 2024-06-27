import { AnyObject } from "src/@types"

export interface AddResourceInput {
    objectUrl?: string
    objectKey: string
    fileName: string
    fileType: string
    fileSize: number
    metadata?: AnyObject
    blurHash?: string
    relatedId? : string
}