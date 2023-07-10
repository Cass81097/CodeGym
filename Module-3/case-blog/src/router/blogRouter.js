import blogController from "../controller/blogController.js";

let blogRouter = {
    '/home': blogController.showHome,
     '/home/add': blogController.add,
}

export default blogRouter;
