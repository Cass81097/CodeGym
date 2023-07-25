"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = __importDefault(require("../controller/studentController"));
const studentRouter = (0, express_1.Router)();
studentRouter.get('/', studentController_1.default.findAll);
studentRouter.get('/class', studentController_1.default.findAllStudentByClass);
studentRouter.post('/', studentController_1.default.addStudent);
studentRouter.get('/search', studentController_1.default.searchStudent);
studentRouter.delete('/delete', studentController_1.default.deleteStudentById);
studentRouter.put('/edit', studentController_1.default.updateStudent);
exports.default = studentRouter;
//# sourceMappingURL=studentRouter.js.map