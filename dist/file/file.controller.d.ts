import { User } from "@prisma/client";
import { Response } from 'express';
import { GetFileParamDto, GetImageParamDto, GetImageQueryDto } from './file.dto';
import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadUser(file: Express.Multer.File): {
        fileName: string;
    };
    getObjectCompress(response: Response, param: GetImageParamDto, query: GetImageQueryDto): Promise<boolean>;
    getTmpFileUser(response: Response, user: User, param: GetFileParamDto): Promise<void>;
}
