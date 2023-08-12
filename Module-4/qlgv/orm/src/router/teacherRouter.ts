import {Router} from "express";
import teacherController from "../controller/teacherController";
import {auth} from "../middleware/jwt";

const teacherRouter = Router();
teacherRouter.use(auth)
teacherRouter.get('', teacherController.findAll);
teacherRouter.post('', teacherController.add);
teacherRouter.put('/:id', teacherController.update);
teacherRouter.delete('/:id', teacherController.delete);
export default teacherRouter;