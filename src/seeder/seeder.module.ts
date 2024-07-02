import { Module } from '@nestjs/common/decorators';
import { SeederService } from './seeder.service';
import { XConfigModule } from 'src/xconfig';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [XConfigModule,PrismaModule],
  providers: [SeederService]
})
export class SeederModule { }
