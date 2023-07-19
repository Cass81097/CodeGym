import informationController from "../controller/informationController.js";
import cookie from 'cookie';

let informationRouter = {
    // '/profile': informationController.showProfile,
    '/profile/edit': informationController.edit,
    '/about': informationController.showAbout,
    '/profile/delete': informationController.delete,

    '/profile': (req, res) => {
        if (req.headers.cookie) {
            let cookies = cookie.parse(req.headers.cookie);
            let userID = parseInt(cookies.userID);
            res.writeHead(302, {
                Location: `/profile`
            });
            return res.end();
        }

        informationController.showProfile(req, res);
    }
}

export default informationRouter;