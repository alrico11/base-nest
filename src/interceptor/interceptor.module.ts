import { Module } from '@nestjs/common/decorators';
import { ResponseInterceptor } from './response.interceptor';

@Module({
  providers: [ResponseInterceptor]
})
export class InterceptorModule {}
