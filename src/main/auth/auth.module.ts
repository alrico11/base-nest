import { Module } from '@nestjs/common/decorators';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserJwtStrategy } from './jwt.strategy';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy],
})
export class AuthModule { }
