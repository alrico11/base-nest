import { Module } from '@nestjs/common/decorators';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { NotificationController } from './notification.controller';
import { NotificationListener } from './notification.listener';
import { NotificationService } from './notification.service';

@Module({
  imports: [FirebaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListener],
})
export class NotificationModule { }
