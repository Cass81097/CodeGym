"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const brandtService_1 = __importDefault(require("../service/brandtService"));
class brandController {
    constructor() {
        this.findAll = async (req, res) => {
            let listBrand = await brandtService_1.default.getAll();
            res.json(listBrand);
        };
    }
}
exports.default = new brandController();
//# sourceMappingURL=brandController.js.map