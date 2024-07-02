"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zlib_1 = require("zlib");
const prisma_service_1 = require("../prisma/prisma.service");
dayjs_1.default.extend(utc_1.default);
let SeederService = class SeederService {
    constructor(prisma) {
        this.prisma = prisma;
        this.originalDir = process.cwd();
        this.targetDir = path_1.default.join(this.originalDir, 'public/raw');
        process.chdir(this.targetDir);
    }
    async seedAll() {
        console.log("seeding");
        try {
            await this.region();
        }
        catch (error) {
            console.log(error);
        }
    }
    async seedProvinces(tx) {
        try {
            const content = (0, zlib_1.gunzipSync)(fs_1.default.readFileSync(path_1.default.join(this.targetDir, 'provinces.csv.gz')));
            const provinces = this.csvToArray(content.toString());
            await this.truncate('province');
            await tx.province.createMany({
                data: provinces
                    .map((row) => ({
                    code: row[0],
                    name: row[1],
                    latitude: row[2],
                    longitude: row[3],
                }))
                    .filter((p) => !!p.code),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async seedCities(tx) {
        try {
            const content = (0, zlib_1.gunzipSync)(fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'cities.csv.gz')));
            const cities = this.csvToArray(content.toString());
            await this.truncate('city');
            const data = await tx.city.createMany({
                data: cities
                    .map((row) => ({
                    code: row[0],
                    provinceCode: row[1],
                    name: row[2],
                    latitude: row[3],
                    longitude: row[4],
                }))
                    .filter((p) => !!p.code),
            });
            console.log(data);
        }
        catch (error) {
            throw error;
        }
    }
    async seedDistricts(tx) {
        try {
            const content = (0, zlib_1.gunzipSync)(fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'districts.csv.gz')));
            const districts = this.csvToArray(content.toString());
            await this.truncate('district');
            await tx.district.createMany({
                data: districts
                    .map((row) => ({
                    code: row[0],
                    cityCode: row[1],
                    name: row[2],
                    latitude: row[3],
                    longitude: row[4],
                }))
                    .filter((p) => !!p.code),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async seedSubDistricts(tx) {
        try {
            await this.truncate('subDistrict');
            fs_1.default
                .readdirSync(path_1.default.join(process.cwd(), 'subdistricts'))
                .map((file) => {
                const content = (0, zlib_1.gunzipSync)(fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'subdistricts', file)));
                const subDistricts = this.csvToArray(content.toString());
                return tx.subDistrict.createMany({
                    data: subDistricts
                        .map((row) => ({
                        code: row[0],
                        districtCode: row[1],
                        name: row[2],
                        latitude: row[3],
                        longitude: row[4],
                    }))
                        .filter((p) => !!p.code),
                });
            });
        }
        catch (error) {
            throw error;
        }
    }
    async truncate(model) {
        const tableName = await this.prisma.extended[model].getTableName();
        return await this.prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
    }
    csvToArray(csv) {
        return csv.split('\n').map((row) => row.split(','));
    }
    async device(tx) {
        const user = await this.prisma.user.findFirst();
        if (!user)
            throw new Error();
        const device = await tx.device.create({
            data: {
                id: "5b32f064-fdb5-4ce3-a293-ef0842136676",
                fingerprint: "123"
            }
        });
        await tx.userDevice.create({
            data: {
                deviceId: device.id,
                userId: user.id
            }
        });
    }
    async region() {
        await this.prisma.$transaction(async (tx) => {
            await this.seedProvinces(tx);
            await this.seedCities(tx);
            await this.seedDistricts(tx);
            await this.seedSubDistricts(tx);
        }, {
            timeout: 100000,
        });
    }
    async devices() {
        try {
            await this.prisma.$transaction(async (tx) => {
                await this.device(tx);
            }, {
                timeout: 1000,
            });
        }
        catch (error) {
            console.error("Error creating device:", error);
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map