import {Router} from "express";
import classRouter from "./classRouter";
import studentRouter from "./studentRouter";
import userRouter from "./userRouter";

const router = Router();

router.use('/students', studentRouter);
router.use('/classes', classRouter);
router.use('', userRouter);
export default router;


