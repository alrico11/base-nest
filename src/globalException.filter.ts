import { Catch, ExceptionFilter, ArgumentsHost, Logger, HttpException } from '@nestjs/common';
import { ZodError } from 'zod';
import { LogService } from './log';

@Catch(HttpException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly l: LogService) { this.l.setContext(InternalServerErrorExceptionFilter.name) }
  catch(exception: HttpException, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse()
      const status = exception.getStatus()
      if (status === 500) this.l.error(exception)
      return response.status(status).json({ statusCode: status, message: status === 500 ? 'Internal server error' : exception.message })
    } catch (error) {
      // console.error(error)
    }
  }
}
@Catch(ZodError)
export class ZodErrorFilter implements ExceptionFilter {
  constructor(private readonly l: LogService) { this.l.setContext(InternalServerErrorExceptionFilter.name) }
  catch(zodError: ZodError, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      ctx.getRequest()

      const response = ctx.getResponse();
      const generatedMessage =
        zodError.issues.map(issue => `${issue.path.join(', ')} is ${issue.message}`).join(', ')

      // You can send a customized error response here if needed
      return response.status(400).json({ statusCode: 400, message: generatedMessage })
    } catch (error) {
      // console.error(error)
    }
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly l: LogService) { this.l.setContext(InternalServerErrorExceptionFilter.name) }
  catch(error: Error, host: ArgumentsHost) {
    try {
      console.error(error)
      this.l.error(error)
      const ctx = host?.switchToHttp();
      const response = ctx?.getResponse();

      if (ctx !== undefined && response !== undefined)
      // response.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
      response.status(500).json({ statusCode: 500, message: error })
    } catch (error) {
      // console.error(error)
    }
  }
}
