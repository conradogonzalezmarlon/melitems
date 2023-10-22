"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const local_1 = require("../common/local");
const bull_1 = require("@nestjs/bull");
const constants_1 = require("../common/constants");
let ItemsService = class ItemsService {
    constructor(fileTranslatorFactory, itemsQueue) {
        this.fileTranslatorFactory = fileTranslatorFactory;
        this.itemsQueue = itemsQueue;
    }
    async uploadItems(file, data) {
        let batchLinesTranslated = [];
        const sendLine = (lineTranslated, index) => {
            if (index === -1) {
                this.itemsQueue.add(batchLinesTranslated);
                return;
            }
            if (!lineTranslated) {
                return;
            }
            batchLinesTranslated.push(lineTranslated);
            if (batchLinesTranslated.length === 5) {
                this.itemsQueue.add([...batchLinesTranslated]);
                batchLinesTranslated = [];
            }
        };
        this.fileTranslatorFactory
            .get(data)
            .translate(file.buffer, sendLine);
        return `${file.originalname} received successfully. Uploading items...`;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bull_1.InjectQueue)(constants_1.ITEMS_QUEUE)),
    __metadata("design:paramtypes", [local_1.FileTranslatorFactory, Object])
], ItemsService);
//# sourceMappingURL=items.service.js.map