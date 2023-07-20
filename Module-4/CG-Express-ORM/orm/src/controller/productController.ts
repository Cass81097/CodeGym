import { Request, Response } from "express";
import productService from "../service/productService";
import url from "url";
import * as fs from "fs";

class ProductController {
    // private productService: any;

    // constructor() {
    //     this.productService = productService;
    // }

    findAll = async (req: Request, res: Response) => {
        let listProduct = await productService.getAll();
        res.json(listProduct);
    }

    addProduct = async (req: Request, res: Response) => {
        let results = await productService.save(req.body);
        console.log(req.body);
        res.json(results);
    }

    searchProductById = async (req: Request, res: Response) => {
        let results = await productService.search(req.params.id);
        res.json(results);
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            let indexProduct = await productService.search(req.params.id);
            // console.log('Thong bao index', indexProduct);
            let pID = req.params.id;
            let product = req.body;
            let results = await productService.updateProduct(pID, product);
            // console.log('Thong bao result', results);

            if (
                indexProduct.name !== results.name ||
                indexProduct.price !== results.price ||
                indexProduct.image !== results.image ||
                indexProduct.category !== results.category
            ) {
                res.json('Sửa thành công');
            } else {
                res.json(results);
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Internal Server Error' });
        }
    };


    deleteProductById = async (req: Request, res: Response) => {
        await productService.deleteProductById(req.params.id);
        res.json('Xóa thành công sản phẩm!');
    }
}

export default new ProductController();
