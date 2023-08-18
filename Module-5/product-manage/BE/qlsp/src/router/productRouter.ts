import {Router} from "express";
import productController from "../controller/productController";
import { auth } from "../middleware/jwt";

const productRouter = Router();

productRouter.use(auth);

productRouter.get('', productController.findAll);
productRouter.get("/:id", productController.findByID);
productRouter.post('', productController.add);
productRouter.delete("/:id",productController.delete);
productRouter.put("/:id",productController.edit);

export default productRouter;
