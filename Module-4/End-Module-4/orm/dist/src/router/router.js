"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandRouter_1 = __importDefault(require("./brandRouter"));
const carRouter_1 = __importDefault(require("./carRouter"));
const router = (0, express_1.Router)();
router.use('/car', carRouter_1.default);
router.use('/brand', brandRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map