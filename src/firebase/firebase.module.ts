import { Module } from '@nestjs/common/decorators';
import { FirebaseService } from './firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
