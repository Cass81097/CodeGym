import {Router} from "express";
import {userRouter} from "./userRouter";
import teacherRouter from "./teacherRouter";

const router = Router();
router.use('/', userRouter);
router.use('/teachers', teacherRouter);
export default router;
