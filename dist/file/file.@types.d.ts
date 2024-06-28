import { Admin, User } from "@prisma/client";
import { GetFileParamDto, GetImageParamDto, GetImageQueryDto } from "./file.dto";
import { Response } from 'express';
import { Metadata } from 'sharp';
import { AnyObject } from "src/@types";
export type ImageMetadata = Metadata;
export interface IGetImageDto {
    param: GetImageParamDto;
    query: GetImageQueryDto;
}
export interface IUploadToObjectStorage {
    contentType: string;
    filePath: string;
    prefix: string;
    fileName?: string;
    blurHash?: string;
}
export interface IResolveUrl {
    fileName: string;
    prefix: string;
}
export interface CompressImageOption {
    width?: number;
    height?: number;
}
export interface IFileCompressUpload {
    fileName: string[] | string;
    user: User | Admin;
    prefix: string;
}
export interface IFindFile {
    user: User | Admin;
    fileName: string;
}
export interface IGetTmpFile {
    param: GetFileParamDto;
    response: Response;
    user: User | Admin;
}
export interface IFindClosestSize {
    childResourceXY: ISizeXY[];
    queryResourceXY: ISizeXY;
}
export interface ISizeXY {
    sizeX: number;
    sizeY: number;
}
export interface AddResourceInput {
    objectUrl?: string;
    objectKey: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    metadata?: AnyObject;
    blurHash?: string;
    relatedId?: string;
}
