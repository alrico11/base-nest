import { NestFactory } from "@nestjs/core";
import { SeederModule, SeederService } from "./seeder";

async function bootstrap() {
    try {
        const app = await NestFactory.createApplicationContext(SeederModule)
        const seeder = app.get(SeederService)
        await seeder.seedAll()
        await app.close()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

bootstrap()