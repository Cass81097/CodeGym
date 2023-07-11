import informationController from "../controller/informationController.js";

let informationRouter = {
    '/profile': informationController.showProfile,
    '/profile/edit': informationController.edit,
    '/about' : informationController.showAbout,
    '/profile/delete' : informationController.delete

}

export default informationRouter;
