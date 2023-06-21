import fs from 'fs';
import studentRouter from './studentRouter.js'
import http from 'http';
import qs from 'qs';
import url from 'url';
import { StudentServices } from '../service/studentServices.js';

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

