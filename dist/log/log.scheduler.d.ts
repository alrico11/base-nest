import { PrismaService } from "src/prisma";
import { LogService } from "./log.service";
export declare class LogScheduler {
    private readonly prisma;
    private readonly log;
    constructor(prisma: PrismaService, log: LogService);
    private scheduledDeletion;
}
