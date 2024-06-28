import { Module, forwardRef } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config.service';
import { ResourceService } from './file.resource.service';
import { ResourceListener } from './file.listener';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: MulterConfigService })
  ],
  providers: [FileService, ResourceService, ResourceListener],
  controllers: [FileController],
  exports: [FileService, ResourceService]
})
export class FileModule { }
