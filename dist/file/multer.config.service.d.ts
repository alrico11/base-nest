import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { XConfig } from "src/xconfig";
export declare class MulterConfigService implements MulterOptionsFactory {
    private config;
    private sanitizeFileName;
    constructor(config: XConfig);
    createMulterOptions(): MulterModuleOptions;
    removeNonAlphanumeric(value: string): string;
}
