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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadItemDto = void 0;
const class_validator_1 = require("class-validator");
class UploadItemDto {
}
exports.UploadItemDto = UploadItemDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([',', '.', '-', '_', '\\t']),
    __metadata("design:type", String)
], UploadItemDto.prototype, "separator", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ascii', 'utf8', 'utf-8', 'base64', 'hex']),
    __metadata("design:type", String)
], UploadItemDto.prototype, "encoding", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['csv', 'tsv', 'jsonl', 'txt']),
    __metadata("design:type", String)
], UploadItemDto.prototype, "format", void 0);
//# sourceMappingURL=upload-items.dto.js.map