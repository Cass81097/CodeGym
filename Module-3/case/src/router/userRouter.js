import fs from 'fs'
import userController from "../controller/userController.js";

let userRouter = {
    '/users': userController.showAll,
    '/add-user': userController.showFormAdd,
    '/sign-up': userController.signUp,
    '/sign-in': userController.signIn,
}

export default userRouter;
