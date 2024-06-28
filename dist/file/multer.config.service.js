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
exports.MulterConfigService = void 0;
const common_1 = require("@nestjs/common");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
const xconfig_1 = require("../xconfig");
let MulterConfigService = class MulterConfigService {
    constructor(config) {
        this.config = config;
        this.sanitizeFileName = (fileName) => fileName.replace(/[^a-zA-Z0-9.]/g, '');
    }
    createMulterOptions() {
        const dirPath = (0, path_1.join)(this.config.env.TMP_FILE_PATH);
        return {
            storage: (0, multer_1.diskStorage)({
                destination: (req, file, cb) => {
                    if (req.user?.id === undefined)
                        return cb(new Error('user not found'), 'tmp/trash');
                    const path = (0, path_1.join)(dirPath, 'user', req.user.id);
                    if (!(0, fs_1.existsSync)(path))
                        (0, fs_1.mkdirSync)(path, { recursive: true });
                    return cb(null, path);
                },
                filename: (req, file, cb) => {
                    const name = file.originalname.split('.')[0];
                    const fileExtName = (0, path_1.extname)(file.originalname);
                    const day = (0, dayjs_1.default)();
                    cb(null, `${this.sanitizeFileName(name)}-${day.toDate().getTime()}${fileExtName}`);
                }
            }),
        };
    }
    removeNonAlphanumeric(value) {
        return value.replace(/[^a-zA-Z0-9]/g, "");
    }
};
exports.MulterConfigService = MulterConfigService;
exports.MulterConfigService = MulterConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [xconfig_1.XConfig])
], MulterConfigService);
//# sourceMappingURL=multer.config.service.js.map