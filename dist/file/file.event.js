"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceEditedEvent = exports.ResourceDeletedEvent = exports.ResourceCreatedEvent = void 0;
const _classes_1 = require("../@classes");
class ResourceCreatedEvent extends _classes_1.CompactClass {
}
exports.ResourceCreatedEvent = ResourceCreatedEvent;
ResourceCreatedEvent.key = 'RESOURCE.CREATED';
class ResourceDeletedEvent extends _classes_1.CompactClass {
}
exports.ResourceDeletedEvent = ResourceDeletedEvent;
ResourceDeletedEvent.key = 'RESOURCE.DELETED';
class ResourceEditedEvent extends _classes_1.CompactClass {
}
exports.ResourceEditedEvent = ResourceEditedEvent;
ResourceEditedEvent.key = 'RESOURCE.EDITED';
//# sourceMappingURL=file.event.js.map