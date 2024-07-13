import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ISaveLog, LogInterface } from './log.@types';

interface LogOptions { level: number }

@Injectable({ scope: Scope.TRANSIENT })
export class LogService implements LoggerService {
  private context?: string
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public setContext(context: string) { this.context = context }

  private async saveLog({ data, level: { level = 1, ...optionalParams }, info, method, organizationId, projectId, userId }: ISaveLog) {
    try {
      await this.prisma.log.create({
        data: {
          context: this.context,
          level: level,
          method,
          organizationId, projectId,
          info,
          data: data instanceof Error ? { message: data?.message, stack: data?.stack, name: data?.name } : data,
          userId,
        }
      })
    } catch (error) { console.error(error) }
  }

  save({ method, newData, oldData, userId, organizationId, projectId,data }: LogInterface) {
    const newInfo = newData && oldData ? this.compareObjects(oldData, newData) : newData
    this.saveLog({ data, level: { level: 1 }, userId, info : newInfo, method, organizationId, projectId })
  }

  info(data: object, { level = 1, ...optionalParams }: LogOptions = { level: 1 }) {
    this.saveLog({ data, level: { level: 1 } })
  }

  log(data: object, { level = 2, ...optionalParams }: LogOptions = { level: 2 }) {
    this.saveLog({ data, level: { level: 2 } })
  }

  error(data: object, { level = 8, ...optionalParams }: LogOptions = { level: 8 }) {
    this.saveLog({ data, level: { level: 8 } })
  }

  warn(data: object, { level = 7, ...optionalParams }: LogOptions = { level: 7 }) {
    this.saveLog({ data, level: { level: 7 } })
  }

  debug?(data: object, { level = 3, ...optionalParams }: LogOptions = { level: 3 }) {
    this.saveLog({ data, level: { level: 3 } })
  }

  verbose?(data: object, { level = 4, ...optionalParams }: LogOptions = { level: 4 }) {
    this.saveLog({ data, level: { level: 4 } })
  }

  event(data: object, { level = 4, ...optionalParams }: LogOptions = { level: 5 }) {
    this.saveLog({ data, level: { level:  4} })
  }

  compareObjects(oldObj: Record<string, any>, newObj: Record<string, any>) {
    const differences: { oldValue?: Record<string, any>, newValue?: Record<string, any> } = {};
    for (const key in oldObj) {
      if (oldObj[key] !== newObj[key]) {
        differences.oldValue = differences.oldValue || {};
        differences.newValue = differences.newValue || {};
        differences.oldValue[key] = oldObj[key];
        differences.newValue[key] = newObj[key];
      }
    }
    for (const key in newObj) {
      if (!oldObj.hasOwnProperty(key)) {
        differences.newValue = differences.newValue || {};
        differences.newValue[key] = newObj[key];
      }
    }
    return differences;
  }
}
