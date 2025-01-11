import router, {Router} from "express";
import {registerUser} from "../controllers/user.controllers.js"

const Route = router();

Route.route("/register").post(registerUser);

export default Route;