"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSopDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_sop_dto_1 = require("./create-sop.dto");
class UpdateSopDto extends (0, swagger_1.PartialType)(create_sop_dto_1.CreateSopDto) {
}
exports.UpdateSopDto = UpdateSopDto;
//# sourceMappingURL=update-sop.dto.js.map