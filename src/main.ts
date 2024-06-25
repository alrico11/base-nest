import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: '*' });

    const configService = app.get(ConfigService);
    const NODE_ENV = configService.get('NODE_ENV')

    if (NODE_ENV !== "PRODUCTION") {
      const config = new DocumentBuilder()
        .setTitle('Laparaga')
        .setVersion('0.0.1')
        .addBearerAuth()
        .setExternalDoc('Postman Collection', '/api-docs-json')
        .build()
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api-docs', app, document, {
        swaggerOptions: {
          persistAuthorization: true,
          tagsSorter: (a, b) => a.localeCompare(b),
        }
      });
    }

    const APP_PORT = configService.get('APP_PORT');
    await app.listen(APP_PORT);
    console.log('server run on http://localhost:' + APP_PORT);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
bootstrap();
