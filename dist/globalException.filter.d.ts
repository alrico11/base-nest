import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { ZodError } from 'zod';
import { LogService } from './log';
export declare class InternalServerErrorExceptionFilter implements ExceptionFilter {
    private readonly l;
    constructor(l: LogService);
    catch(exception: HttpException, host: ArgumentsHost): any;
}
export declare class ZodErrorFilter implements ExceptionFilter {
    private readonly l;
    constructor(l: LogService);
    catch(zodError: ZodError, host: ArgumentsHost): any;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly l;
    constructor(l: LogService);
    catch(error: Error, host: ArgumentsHost): void;
}
