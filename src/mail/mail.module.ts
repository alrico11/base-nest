import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailListener } from './mail.listener';

@Module({
  providers: [MailService,MailListener],
})
export class MailModule {}
