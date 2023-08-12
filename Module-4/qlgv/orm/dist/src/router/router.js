"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const teacherRouter_1 = __importDefault(require("./teacherRouter"));
const router = (0, express_1.Router)();
router.use('/', userRouter_1.userRouter);
router.use('/teachers', teacherRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map