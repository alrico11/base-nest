"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors({ origin: '*' });
        const configService = app.get(config_1.ConfigService);
        const NODE_ENV = configService.get('NODE_ENV');
        if (NODE_ENV !== "PRODUCTION") {
            const config = new swagger_1.DocumentBuilder()
                .setTitle('Kolabora')
                .setVersion('0.0.1')
                .addBearerAuth()
                .setExternalDoc('Postman Collection', '/api-docs-json')
                .build();
            const document = swagger_1.SwaggerModule.createDocument(app, config);
            swagger_1.SwaggerModule.setup('api-docs', app, document, {
                swaggerOptions: {
                    persistAuthorization: true,
                    tagsSorter: (a, b) => a.localeCompare(b),
                }
            });
        }
        const APP_PORT = configService.get('APP_PORT');
        await app.listen(APP_PORT);
        console.log('server run on http://localhost:' + APP_PORT);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map