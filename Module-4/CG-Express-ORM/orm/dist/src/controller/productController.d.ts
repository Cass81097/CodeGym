import { Request, Response } from "express";
declare class ProductController {
    findAll: (req: Request, res: Response) => Promise<void>;
    addProduct: (req: Request, res: Response) => Promise<void>;
    searchProductById: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProductById: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
