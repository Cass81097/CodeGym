import { Request, Response } from "express";
import carService from "../service/carService";

class carController {
    findAll = async (req: Request, res: Response) => {
        let { asc, desc } = req.query; 
        
        if (asc === undefined && desc === undefined) {
            let listCar = await carService.getAll();
            res.json(listCar);
        } else if (asc !== undefined && desc === undefined) {
            let listCar = await carService.getAllByDESC();
            res.json(listCar);
        } else if (asc == undefined && desc !== undefined) {
            let listCar = await carService.getAllByASC();
            res.json(listCar);
        }
    }

    findAllByID = async (req: Request, res: Response) => {
        let listCar = await carService.getAllByID(req.params.id);
        res.json(listCar);
    }
    
    addCar = async (req: Request, res: Response) => {
        let results = await carService.saveCar(req.body);
        console.log(req.body);
        res.json(results);
    }

    searchCarById = async (req: Request, res: Response) => {
        let results = await carService.searchCar(req.params.id);
        res.json(results);
    }

    deleteCarById = async (req: Request, res: Response) => {
        await carService.deleteCarById(req.params.id);
        res.json('Xóa thành công!');
    }

    updateCar = async (req: Request, res: Response) => {
        try {
            let indexCar = await carService.searchCar(req.params.id);
            let cID = req.params.id;
            let Cares = req.body;
            let results = await carService.updateCar(cID, Cares);

            if (
                indexCar.name !== results.name ||
                indexCar.brandName !== results.brandName ||
                indexCar.totalCar !== results.totalStudent 
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
}

export default new carController();
