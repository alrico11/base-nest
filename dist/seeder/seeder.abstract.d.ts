import { Class } from 'src/@types';
import { PrismaService } from '../prisma';
export declare abstract class Seeder {
    protected prisma: PrismaService;
    constructor(prisma: PrismaService);
    run(): Promise<void>;
    call<T extends Seeder>(seeder: Class<T>): Promise<void>;
    restoreAutoincrement(model: keyof PrismaService): Promise<unknown>;
}
