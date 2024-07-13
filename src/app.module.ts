import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RateLimiterGuard } from 'nestjs-rate-limiter';
import { AppController } from './app.controller';
import AppImports from './app.imports';
import { AppService } from './app.service';
import { AllExceptionsFilter, InternalServerErrorExceptionFilter, ZodErrorFilter } from './globalException.filter';
import { ResponseInterceptor } from './interceptor';
import { EventLogModule } from './main/project/event-log/event-log.module';

@Global()
@Module({
  imports: AppImports,
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: InternalServerErrorExceptionFilter },
    { provide: APP_FILTER, useClass: ZodErrorFilter },
    { provide: APP_GUARD, useClass: RateLimiterGuard }
  ],
})
export class AppModule { }
