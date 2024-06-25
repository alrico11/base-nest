import { LoggerService } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
interface LogOptions {
    level: number;
}
export declare class LogService implements LoggerService {
    private readonly prisma;
    private context?;
    constructor(prisma: PrismaService);
    setContext(context: string): void;
    private saveLog;
    info(data: object, { level, ...optionalParams }?: LogOptions): void;
    log(data: object, { level, ...optionalParams }?: LogOptions): void;
    error(data: object, { level, ...optionalParams }?: LogOptions): void;
    warn(data: object, { level, ...optionalParams }?: LogOptions): void;
    debug?(data: object, { level, ...optionalParams }?: LogOptions): void;
    verbose?(data: object, { level, ...optionalParams }?: LogOptions): void;
    event(data: object, { level, ...optionalParams }?: LogOptions): void;
}
export {};
