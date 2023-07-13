import blogController from "../controller/blogController.js";

let blogRouter = {
    // '/home': blogController.showHome,
    '/home': (req, res) => {
        if (!req.headers.cookie) {
            res.writeHead(302, {
                Location: '/sign-in'
            });
            return res.end();
        } else {
            blogController.showHome(req, res);
        }
    },
}

export default blogRouter;
