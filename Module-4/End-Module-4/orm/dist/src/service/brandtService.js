"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Brand_1 = require("../entity/Brand");
const data_source_1 = require("../data-source");
class BrandService {
    constructor() {
        this.getAll = async () => {
            let brands = await this.brandRepository.find();
            return brands;
        };
        this.brandRepository = data_source_1.AppDataSource.getRepository(Brand_1.Brand);
    }
}
exports.default = new BrandService();
//# sourceMappingURL=brandtService.js.map