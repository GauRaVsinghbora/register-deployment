import { apiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {user} from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try { 
        const token =  req.cookies?.accessToken  || 
        req.header("Authorization")?.replace("Bearer","");
    
        if(!token){
            throw new apiError(401,"unauthorized required");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decodedToken);
    
        const User = await user.findById(decodedToken?._id).select("-password -refreshToken");
        // console.log(User);
        if(!User){
            //toDo: discuss about frontend.
            throw new apiError(401,"invalid accessToken");
        }
    
        req.User = User;
        next();
    } catch (error) {
        throw new apiError(401,"Invalid access token");
    }
});
