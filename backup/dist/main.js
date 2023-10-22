"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const local_1 = require("./common/local");
const mongo_1 = require("./common/local/mongo");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const cacheLocal = await app.resolve(local_1.CacheLocal);
    await cacheLocal.start();
    await (0, mongo_1.connectMongo)();
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map