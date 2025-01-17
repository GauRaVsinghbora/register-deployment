import router, {Router} from "express";
import {registerUser,loginUser} from "../controllers/user.controllers.js"

const Route = router();

Route.route("/register").post(registerUser);
Route.get("/", (req, res) => {
    res.status(200).json({ message: "Users API is working!" });
});
Route.route("/login").post(loginUser);


export default Route;