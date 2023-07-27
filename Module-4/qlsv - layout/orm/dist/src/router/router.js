"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classRouter_1 = __importDefault(require("./classRouter"));
const studentRouter_1 = __importDefault(require("./studentRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (0, express_1.Router)();
router.use('/students', studentRouter_1.default);
router.use('/classes', classRouter_1.default);
router.use('', userRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map