"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const client_1 = require("./client");
class MongoRepository {
    collection(collectionName) {
        return client_1.client.
            db(process.env.MONGODB_NAME)
            .collection(collectionName);
    }
}
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=mongo.repository.js.map