import { Module } from '@nestjs/common';
import { EventLogModule as MainProjectEventLogModule} from 'src/main/project/event-log';
import { EventLogController} from './event-log.controller';

@Module({
  imports: [MainProjectEventLogModule],
  controllers: [EventLogController],
})
export class EventLogModule { }