"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeder_1 = require("./seeder");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.createApplicationContext(seeder_1.SeederModule);
        const seeder = app.get(seeder_1.SeederService);
        await seeder.seedAll();
        await app.close();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map