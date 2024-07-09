import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { LogService } from "src/log";
import { PrismaService } from "src/prisma";
import { SchedulerUserResetTokenJobEvent } from "src/scheduler/scheduler.event";
import { SCHEDULER_QUEUE_KEY } from "../../scheduler/scheduler.constans";

@Processor(SCHEDULER_QUEUE_KEY)
export class UserJob {
    constructor(
        private readonly prisma: PrismaService,
        private readonly l: LogService
    ) { this.l.setContext(UserJob.name) }
    @Process(SchedulerUserResetTokenJobEvent.key)
    async userResetTokenJob({ data: { data } }: Job<SchedulerUserResetTokenJobEvent>) {
        const { token, user } = data
        const existUser = await this.prisma.userResetToken.delete({ where: { id: token, userId: user.id } });
        try {
            return true;
        } catch (error) {
            this.l.error({
                message: `failed to delete user reset token with id ${existUser.userId}`,
                error: error,
            })
        }
    }
}