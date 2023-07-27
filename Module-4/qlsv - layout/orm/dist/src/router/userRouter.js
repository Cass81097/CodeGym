"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = (0, express_1.Router)();
userRouter.post('/register', userController_1.default.register);
userRouter.post('/login', userController_1.default.login);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map