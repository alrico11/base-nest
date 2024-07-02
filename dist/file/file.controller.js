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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const common_1 = require("@nestjs/common");
const file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../constants");
const auth_1 = require("../main/auth");
const file_dto_1 = require("./file.dto");
const file_service_1 = require("./file.service");
let FileController = class FileController {
    constructor(fileService) {
        this.fileService = fileService;
    }
    uploadUser(file) {
        return this.fileService.handleUpload(file);
    }
    getObjectCompress(response, param, query) {
        return this.fileService.getObjectCustomize(response, { param, query });
    }
    getTmpFileUser(response, user, param) {
        return this.fileService.getTmpFile({ param, response, user });
    }
};
exports.FileController = FileController;
__decorate([
    (0, common_1.Post)('file/upload'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(constants_1.FileFormData),
    (0, common_1.UseGuards)(auth_1.UserJwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, file_interceptor_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({ operationId: 'UserUploadFile' }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({ validators: [new common_1.MaxFileSizeValidator({ maxSize: 3 * 1024 * 1024 })] }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "uploadUser", null);
__decorate([
    (0, common_1.Get)('file/cdn/:prefix/:fileName'),
    (0, swagger_1.ApiOperation)({ operationId: 'GetFileFromCDN' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_dto_1.GetImageParamDto, file_dto_1.GetImageQueryDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "getObjectCompress", null);
__decorate([
    (0, common_1.UseGuards)(auth_1.UserJwtGuard),
    (0, common_1.Get)('file/tmp/user/:userId/:fileName'),
    (0, swagger_1.ApiOperation)({ operationId: 'GetTmpFileUser' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, auth_1.UserInstance)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, file_dto_1.GetFileParamDto]),
    __metadata("design:returntype", void 0)
], FileController.prototype, "getTmpFileUser", null);
exports.FileController = FileController = __decorate([
    (0, swagger_1.ApiTags)('File'),
    (0, swagger_1.ApiHeaders)(constants_1.DeviceHeaders),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FileController);
//# sourceMappingURL=file.controller.js.map