"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsRepositoryProvider = void 0;
const items_mongo_repository_1 = require("./items.mongo.repository");
exports.ItemsRepositoryProvider = {
    provide: 'ItemsRepository',
    useClass: items_mongo_repository_1.ItemsMongoRepository,
};
//# sourceMappingURL=index.js.map