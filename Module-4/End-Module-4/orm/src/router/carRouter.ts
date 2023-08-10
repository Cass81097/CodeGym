import { Router } from "express";
import carController from "../controller/carController";

const carRouter = Router();

carRouter.get('/', carController.findAll);
carRouter.get('/:id', carController.findAllByID);

carRouter.post('/', carController.addCar);
carRouter.get('/search/:id', carController.searchCarById);

carRouter.delete('/delete/:id', carController.deleteCarById);

carRouter.put('/edit/:id', carController.updateCar);

export default carRouter;
