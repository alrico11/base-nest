import { Module } from '@nestjs/common/decorators';
import { BullModule } from '@nestjs/bull';
import { SCHEDULER_QUEUE_KEY } from './scheduler.constans';
import { SchedulerListener } from './scheduler.listener';
import { ReminderJob } from 'src/main/reminder/reminder.job';
import { ReminderModule } from 'src/main/reminder/reminder.module';

@Module({
  imports:[
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6380
      },
    }),
    BullModule.registerQueue({ name: SCHEDULER_QUEUE_KEY  }),
    ReminderModule
  ],
  providers: [SchedulerListener,ReminderJob],
  exports:[SchedulerModule]
})
export class SchedulerModule {}