import {Router} from "express";
import brandRouter from "./brandRouter";
import carRouter from "./carRouter";

const router = Router();

router.use('/car', carRouter);
router.use('/brand', brandRouter);

export default router;


