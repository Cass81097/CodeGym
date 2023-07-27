"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classController_1 = __importDefault(require("../controller/classController"));
const classRouter = (0, express_1.Router)();
classRouter.get('/', classController_1.default.findAll);
classRouter.post('/', classController_1.default.addClass);
classRouter.get('/search', classController_1.default.searchClassById);
classRouter.delete('/delete', classController_1.default.deleteClassById);
classRouter.put('/edit', classController_1.default.updateClass);
exports.default = classRouter;
//# sourceMappingURL=classRouter.js.map