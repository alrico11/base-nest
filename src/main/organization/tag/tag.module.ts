import { Module } from '@nestjs/common';
import { TagModule as MainTagModule } from 'src/main/tag';
import { TagController } from './tag.controller';

@Module({
  imports : [MainTagModule],
  controllers: [TagController],
})
export class TagModule {}