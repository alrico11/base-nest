import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
type TxCtx = Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>;
export declare class SeederService {
    private readonly prisma;
    private originalDir;
    private targetDir;
    constructor(prisma: PrismaService);
    seedAll(): Promise<void>;
    seedProvinces(tx: TxCtx): Promise<void>;
    seedCities(tx: TxCtx): Promise<void>;
    seedDistricts(tx: TxCtx): Promise<void>;
    seedSubDistricts(tx: TxCtx): Promise<void>;
    truncate(model: keyof PrismaService): Promise<unknown>;
    protected csvToArray(csv: string): string[][];
    device(tx: TxCtx): Promise<void>;
    region(): Promise<void>;
    devices(): Promise<void>;
}
export {};
