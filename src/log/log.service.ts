import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

interface LogOptions { level: number }

@Injectable({ scope: Scope.TRANSIENT })
export class LogService implements LoggerService {
  private context?: string
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public setContext(context: string) { this.context = context }

  private async saveLog(data: Error | object, { level = 1, ...optionalParams }: LogOptions = { level: 1 }) {
    try {
      await this.prisma.log.create({
        data: {
          context: this.context,
          level: level,
          data: data instanceof Error ? { message: data?.message, stack: data?.stack, name: data?.name } : data
        }
      })
    } catch (error) { console.error(error) }
  }

  info(data: object, { level = 1, ...optionalParams }: LogOptions = { level: 1 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  log(data: object, { level = 2, ...optionalParams }: LogOptions = { level: 2 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  error(data: object, { level = 8, ...optionalParams }: LogOptions = { level: 8 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  warn(data: object, { level = 7, ...optionalParams }: LogOptions = { level: 7 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  debug?(data: object, { level = 3, ...optionalParams }: LogOptions = { level: 3 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  verbose?(data: object, { level = 4, ...optionalParams }: LogOptions = { level: 4 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

  event(data: object, { level = 4, ...optionalParams }: LogOptions = { level: 5 }) {
    this.saveLog(data, { level, ...optionalParams })
  }

}
