import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/prisma";
import { LogService } from "./log.service";
import dayjs from "dayjs";

@Injectable()
export class LogScheduler {
    constructor(
        private readonly prisma: PrismaService,
        private readonly log: LogService
    ) {
        this.log.setContext(LogScheduler.name)
    }
    @Cron(CronExpression.EVERY_DAY_AT_2AM)
    private scheduledDeletion() {
        this.log.log({ message: 'running log daily scheduled deletion' })
        this.prisma.log.deleteMany({ where: { timestamp: { lte: dayjs().subtract(3, 'months').toDate() } } })
    }
}