import { Module, forwardRef } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer.config.service';
import { ResourceModule } from 'src/resource/resource.module';

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    forwardRef(() => ResourceModule)
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService] 
})
export class FileModule {}
