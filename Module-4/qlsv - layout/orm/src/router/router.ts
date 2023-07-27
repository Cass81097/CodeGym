import {Router} from "express";
import classRouter from "./classRouter";
import studentRouter from "./studentRouter";

const router = Router();
router.use('/students', studentRouter);
router.use('/classes', classRouter);
export default router;
