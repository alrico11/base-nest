import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { XConfig } from './x.config';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, validate: XConfig.validate, })
    ],
    exports: [XConfig],
    providers: [XConfig]
})
export class XConfigModule { }
