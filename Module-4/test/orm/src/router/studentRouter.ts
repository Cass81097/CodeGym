import { Router } from "express";
import studentController from "../controller/studentController";

const studentRouter = Router();

studentRouter.get('/', studentController.findAll);
studentRouter.get('/class', studentController.findAllStudentByClass);
studentRouter.post('/', studentController.addStudent);


studentRouter.get('/search', studentController.searchStudent);
studentRouter.delete('/delete', studentController.deleteStudentById);

studentRouter.put('/edit', studentController.updateStudent);
// studentRouter.get('/', studentController.getStudentsByPointRange);

export default studentRouter;
