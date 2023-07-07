import fs from 'fs'
import blogController from "../controller/blogController.js";

let blogRouter = {
    '/blogs': blogController.showAll,
    '/blogs/add': blogController.add,
}

export default blogRouter;
