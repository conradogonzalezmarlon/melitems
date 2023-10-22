"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemFailedException = void 0;
class ItemFailedException extends Error {
    constructor(error) {
        super(error.message);
    }
}
exports.ItemFailedException = ItemFailedException;
//# sourceMappingURL=item-failed.exception.js.map