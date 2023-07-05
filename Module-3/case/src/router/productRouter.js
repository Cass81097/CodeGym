import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";

let productRouter = {
    '/products': productController.showAll,
    '/home': productController.showListAll,
    '/products/edit-product': productController.edit,
    '/products/delete': productController.delete,
    '/products/sort': productController.sort,
    // '/products/reSort': productController.reSortById,
    
}

export default productRouter;
