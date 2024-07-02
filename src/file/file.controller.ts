import { Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Response } from 'express';
import { DeviceHeaders, FileFormData } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { GetFileParamDto, GetImageParamDto, GetImageQueryDto } from './file.dto';
import { FileService } from './file.service';

@ApiTags('File')
@ApiHeaders(DeviceHeaders)
@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('file/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileFormData)
  @UseGuards(UserJwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ operationId: 'UserUploadFile' })
  uploadUser(@UploadedFile(
    new ParseFilePipe({ validators: [new MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 })] })) file: Express.Multer.File) {
    return this.fileService.handleUpload(file);
  }

  @Get('file/cdn/:prefix/:fileName')
  @ApiOperation({ operationId: 'GetFileFromCDN' })
  getObjectCompress(@Res() response: Response, @Param() param: GetImageParamDto, @Query() query: GetImageQueryDto) {
    return this.fileService.getObjectCustomize(response, { param, query });
  }

  @UseGuards(UserJwtGuard)
  @Get('file/tmp/user/:userId/:fileName')
  @ApiOperation({ operationId: 'GetTmpFileUser' })
  getTmpFileUser(@Res() response: Response, @UserInstance() user: User, @Param() param: GetFileParamDto) {
    return this.fileService.getTmpFile({ param, response, user });
  }
}
