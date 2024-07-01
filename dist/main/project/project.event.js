"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedProjectFilesEvent = exports.UpdatedProjectEvent = void 0;
const _classes_1 = require("../../@classes");
class UpdatedProjectEvent extends _classes_1.CompactClass {
}
exports.UpdatedProjectEvent = UpdatedProjectEvent;
UpdatedProjectEvent.key = "PROJECT.UPDATED";
class DeletedProjectFilesEvent extends _classes_1.CompactClass {
}
exports.DeletedProjectFilesEvent = DeletedProjectFilesEvent;
DeletedProjectFilesEvent.key = "PROJECT.DELETED";
//# sourceMappingURL=project.event.js.map