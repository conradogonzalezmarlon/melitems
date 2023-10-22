"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = exports.client = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
exports.client = new mongodb_1.MongoClient(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);
const connectMongo = () => exports.client.connect();
exports.connectMongo = connectMongo;
//# sourceMappingURL=client.js.map