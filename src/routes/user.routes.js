import router, {Router} from "express";
import {registerUser,loginUser, logoutUser} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const Route = router();
Route.route("/register").post(registerUser);
Route.route("/login").post(loginUser);
Route.route("/logout").post(verifyJWT, logoutUser);

export default Route;