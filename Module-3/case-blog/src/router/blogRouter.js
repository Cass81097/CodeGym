import blogController from "../controller/blogController.js";

let blogRouter = {
    '/home': blogController.showHome,
}

export default blogRouter;
