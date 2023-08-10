import { Request, Response } from "express";
import brandService from "../service/brandtService";

class brandController {
    findAll = async (req: Request, res: Response) => { 
            let listBrand = await brandService.getAll();
            res.json(listBrand);     
    }
}
export default new brandController();
