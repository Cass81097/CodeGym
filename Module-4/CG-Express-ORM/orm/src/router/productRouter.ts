import {Router} from "express";
import productController from "../controller/productController";

const productRouter = Router();

productRouter.get('/', productController.findAll);
productRouter.post('/', productController.addProduct);

productRouter.get('/search/:id', productController.searchProductById);
productRouter.delete('/delete/:id', productController.deleteProductById);

productRouter.put('/edit/:id', productController.updateProduct);

export default productRouter;
