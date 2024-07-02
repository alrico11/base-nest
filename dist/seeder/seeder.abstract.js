"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seeder = void 0;
class Seeder {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async run() { }
    async call(seeder) {
        const instance = new seeder();
        await instance.run();
    }
    async restoreAutoincrement(model) {
        const tableName = await this.prisma.extended[model].getTableName();
        const lastId = (await this.prisma[model].aggregate({
            _max: {
                id: true,
            },
        }))._max.id || 0;
        return await this.prisma.$queryRawUnsafe(`ALTER SEQUENCE "${tableName}_id_seq" RESTART WITH ${lastId + 1};`);
    }
}
exports.Seeder = Seeder;
//# sourceMappingURL=seeder.abstract.js.map