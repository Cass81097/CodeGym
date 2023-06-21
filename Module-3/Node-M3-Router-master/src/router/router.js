import fs from 'fs';
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";

let router = {
    '/': (req, res) => {
        fs.readFile('view/index.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
    '/err': (req, res) => {
        fs.readFile('view/err.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }
}

router = {...router, ...productRouter};
router = {...router, ...userRouter};
export default router;
