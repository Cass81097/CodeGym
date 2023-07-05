import fs from 'fs'
import qs from "qs";
import productController from "../controller/productController.js";

let productRouter = {
    '/products': productController.showAll,
    // '/products/': productController.sideBar,
    '/products/add-product': productController.showFormAdd,
    '/products/edit-product': productController.edit,
    '/products/delete': productController.delete,
}

export default productRouter;
