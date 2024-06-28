"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_departement_dto_1 = require("./create-departement.dto");
class UpdateDepartementDto extends (0, swagger_1.PartialType)(create_departement_dto_1.CreateDepartementDto) {
}
exports.UpdateDepartementDto = UpdateDepartementDto;
//# sourceMappingURL=update-departement.dto.js.map