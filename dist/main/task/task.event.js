"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedFilesTaskEvent = exports.UpdatedTaskEvent = void 0;
const _classes_1 = require("../../@classes");
class UpdatedTaskEvent extends _classes_1.CompactClass {
}
exports.UpdatedTaskEvent = UpdatedTaskEvent;
UpdatedTaskEvent.key = "TASK.UPDATED";
class DeletedFilesTaskEvent extends _classes_1.CompactClass {
}
exports.DeletedFilesTaskEvent = DeletedFilesTaskEvent;
DeletedFilesTaskEvent.key = "TASK.DELETED";
//# sourceMappingURL=task.event.js.map