import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/sign-up': userController.signUp,
    '/sign-in': (req, res) => {
        if (req.headers.cookie && req.headers.cookie.includes('userID')) {
            res.writeHead(302, {
                Location: '/home'
            });
            return res.end();
        } else {
            userController.signIn(req, res);
        }
    },
    
}

export default userRouter;
