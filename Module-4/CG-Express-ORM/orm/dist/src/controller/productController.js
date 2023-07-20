"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productService_1 = __importDefault(require("../service/productService"));
class ProductController {
    constructor() {
        this.findAll = async (req, res) => {
            let listProduct = await productService_1.default.getAll();
            res.json(listProduct);
        };
        this.addProduct = async (req, res) => {
            let results = await productService_1.default.save(req.body);
            console.log(req.body);
            res.json(results);
        };
        this.searchProductById = async (req, res) => {
            let results = await productService_1.default.search(req.params.id);
            res.json(results);
        };
        this.updateProduct = async (req, res) => {
            try {
                let indexProduct = await productService_1.default.search(req.params.id);
                let pID = req.params.id;
                let product = req.body;
                let results = await productService_1.default.updateProduct(pID, product);
                if (indexProduct.name !== results.name ||
                    indexProduct.price !== results.price ||
                    indexProduct.image !== results.image ||
                    indexProduct.category !== results.category) {
                    res.json('Sửa thành công');
                }
                else {
                    res.json(results);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        this.deleteProductById = async (req, res) => {
            await productService_1.default.deleteProductById(req.params.id);
            res.json('Xóa thành công sản phẩm!');
        };
    }
}
exports.default = new ProductController();
//# sourceMappingURL=productController.js.map