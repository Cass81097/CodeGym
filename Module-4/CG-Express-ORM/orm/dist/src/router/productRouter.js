"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controller/productController"));
const productRouter = (0, express_1.Router)();
productRouter.get('/', productController_1.default.findAll);
productRouter.post('/', productController_1.default.addProduct);
productRouter.get('/search/:id', productController_1.default.searchProductById);
productRouter.delete('/delete/:id', productController_1.default.deleteProductById);
productRouter.put('/edit/:id', productController_1.default.updateProduct);
exports.default = productRouter;
//# sourceMappingURL=productRouter.js.map