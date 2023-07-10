import informationController from "../controller/informationController.js";

let informationRouter = {
    '/profile': informationController.showProfile,
    '/profile/edit': informationController.edit,
}

export default informationRouter;
