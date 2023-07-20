"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../entity/product");
const data_source_1 = require("../data-source");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await this.productRepository.find();
            return products;
        };
        this.save = async (product) => {
            let results = await this.productRepository.save(product);
            return results;
        };
        this.search = async (product) => {
            let results = await this.productRepository.findOne({ where: { id: product } });
            return results;
        };
        this.updateProduct = async (pID, product) => {
            let productEdited = await this.productRepository.findOne({ where: { id: pID } });
            this.productRepository.merge(productEdited, product);
            let results = await this.productRepository.save(productEdited);
            return results;
        };
        this.deleteProductById = async (product) => {
            let results = await this.productRepository.delete(product);
            return results;
        };
        this.productRepository = data_source_1.AppDataSource.getRepository(product_1.ProductPro);
    }
}
exports.default = new ProductService();
//# sourceMappingURL=productService.js.map