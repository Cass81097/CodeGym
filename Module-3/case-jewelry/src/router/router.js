import fs from 'fs';
import jewelryRouter from './jewelryRouter.js'
import jewelryController from '../controller/jewelryController.js'

let router = {
    // '/': (req, res) => {
    //     fs.readFile('view/index.html', 'utf-8', (err, html) => {
    //         res.write(html);
    //         res.end();
    //     })
    // },
    '/': jewelryController.showListJewelry,

    '/jewelry': jewelryController.showListJewelry,

    '/err': (req, res) => {
        fs.readFile('view/err.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })
    }
}

router = {...router, ...jewelryRouter};

export default router;

