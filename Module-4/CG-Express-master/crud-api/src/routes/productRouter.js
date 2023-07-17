import { Router } from 'express';
import productController from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('', productController.findAll);

productRouter.post('', productController.addProduct);
productRouter.get('/add', productController.showAddForm);

productRouter.post('', productController.editProduct);
productRouter.get('/edit', productController.showEditForm);

export default productRouter;
