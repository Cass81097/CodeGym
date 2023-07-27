import { Router } from "express";
import { auth } from "../middleware/jwt";
import classController from "../controller/classController";

const classRouter = Router();

classRouter.use(auth);

classRouter.get('/', classController.findAll);
classRouter.post('/', classController.addClass);

classRouter.get('/search', classController.searchClassById);
classRouter.delete('/delete', classController.deleteClassById);

classRouter.put('/edit', classController.updateClass);

export default classRouter;
