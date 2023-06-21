import fs from 'fs';
import studentRouter from './studentRouter.js'

let router = {
    '/': (req, res) => {
        fs.readFile('view/index.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })
    },

    '/err': (req, res) => {
        fs.readFile('view/err.html', 'utf-8', (err, html) => {
            res.write(html);
            res.end();
        })
    }
}

router = {...router, ...studentRouter};

export default router;

