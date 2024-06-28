import { FirebaseService } from 'src/firebase/firebase.service';
import { LogService } from 'src/log';
import { PrismaService } from 'src/prisma';
import { ILoginDto, ILogOutDto } from './auth.@types';
import { XConfig } from 'src/xconfig';
export declare class AuthService {
    private readonly prisma;
    private readonly config;
    private readonly firebase;
    private readonly l;
    constructor(prisma: PrismaService, config: XConfig, firebase: FirebaseService, l: LogService);
    login({ body, device, lang }: ILoginDto): Promise<{
        message: string;
        data: {
            id: string;
            token: string;
        };
    }>;
    logout({ device, lang, user }: ILogOutDto): Promise<{
        message: string;
    }>;
}
