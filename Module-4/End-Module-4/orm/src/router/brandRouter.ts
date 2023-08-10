import { Router } from "express";
import { auth } from "../middleware/jwt";
import brandController from "../controller/brandController";

const brandRouter = Router();

brandRouter.get('/', brandController.findAll);
// brandRouter.post('/', carController.addClass);

// brandRouter.get('/search', carController.searchClassById);
// brandRouter.delete('/delete', carController.deleteClassById);

// brandRouter.put('/edit', carController.updateClass);

export default brandRouter;
