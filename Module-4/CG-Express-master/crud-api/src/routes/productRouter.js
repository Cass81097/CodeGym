import { Router } from 'express';
import productController from '../controllers/productController.js';

const productRouter = Router();

//Show + Search Product
productRouter.get('', productController.findAll);

//Add Product
productRouter.get('/add', productController.showAddForm);
productRouter.post('/add', productController.addProduct);

//Edit Product
productRouter.get('/edit', productController.showEditForm);
productRouter.post('/edit', productController.editProduct);

//Delete Product
productRouter.delete('/delete', productController.deleteProduct);

export default productRouter;
