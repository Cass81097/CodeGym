import {Request, Response} from "express";
import productService from "../service/productService";
import * as fs from "fs";

class ProductController {
    private productService;

    constructor() {
        this.productService = productService;
    }

    findAll = async (req: Request, res: Response) => {
        let listProduct = await this.productService.getAll();
        res.json(listProduct);
    }

    add = async (req: Request, res: Response)=>{
        let add = await this.productService.add(req.body);
        res.status(200).json({

            message: "Create product success",
            product: add    });
        }
        
    delete = async (req : Request, res: Response)=> {
        const delete1 = await this.productService.delete(req.params.id)
        res.json(delete1)
    }
   
    edit = async (req: Request, res: Response) => {
        try {
            let indexProduct = await productService.findByID(req.query.id);
            let sID = req.query.id;
            let product = req.body;
            let results = await productService.updateProduct(sID, product);

            if (
                indexProduct.title !== results.title ||
                indexProduct.price !== results.price ||
                indexProduct.description !== results.description 
            ) {
                res.json('Sửa thành công');
            } else {
                res.json(results);
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Error!' });
        }
    };

    findByID = async (req: Request, res: Response) => {
        const id = req.params.id;

        const products = await this.productService.findByID(id);
        res.json(products);
    }


}

export default new ProductController();
