import { Module, forwardRef } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceListener } from './resource.listener';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AppConfig } from 'src/config/app.config';
import { FileModule } from 'src/file';

@Module({
  imports: [forwardRef(() => FileModule)],
  providers: [ResourceService, ResourceListener, EventEmitter2, AppConfig],
  exports: [ResourceService],
})
export class ResourceModule {}
