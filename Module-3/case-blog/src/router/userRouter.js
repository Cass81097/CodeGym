import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/sign-up': userController.signUp,
    '/sign-in': userController.signIn,
    // '/sign-in?finish': userController.signIn,
    
}

export default userRouter;
