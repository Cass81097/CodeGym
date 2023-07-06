import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";

let productRouter = {
    '/products': productController.showAll,
    '/home': productController.showListAll,
    '/products/edit-product': productController.edit,
    '/products/delete': productController.delete,
    '/products/sortPrice': productController.sortByPrice,
    '/products/sortId': productController.sortById,
    
}

export default productRouter;
