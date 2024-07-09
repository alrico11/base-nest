import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserJob } from './user.job';
import { UserListener } from './user.listener';

@Module({
  controllers: [UserController],
  providers: [UserService, UserJob, UserListener],
})
export class UserModule { }
