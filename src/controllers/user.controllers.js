import { asyncHandler } from "../utils/asyncHandler.js";
import { user } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";


const generateAccessAndRefereshToken = async (userId) => {
    try {
        const User = await user.findById(userId);
        const AccessToken = User.generateAccessToken();
        const RefreshToken = User.generateRefreshToken();

        User.refreshToken = RefreshToken;
        await User.save({ ValidityBeforeSave: false });

        return { AccessToken, RefreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong while generating the access and referesh token",
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get the data from the frontend.
    // check everything required. (validation)
    // check if user already exits.
    // generate the access token and refresh token;
    // create user objects  -create entry in database.
    // remove password and refresh token field from response.
    // check for user creation.
    // return res.
    // step 1.
    const { fullName, email, password, userName } = req.body;
    // console.log(req.body);
    
    // step 2
    if (
        [fullName, email, password, userName].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new apiError(400, "All fields are required");
    }

    // step 3.
    const exitedUser = await user.findOne({
        $or: [{ userName }, { email }],
    });
    if (exitedUser) {
        throw new apiError(
            400,
            "user already register with this userName or email",
        );
    }

    // step 4.
    const User = await user.create({
        fullName,
        password,
        email,
        userName: userName.toLowerCase()
    });

    // step 5.
    const createdUser = await user.findById(User?._id).select("-password");

    // step 6.
    if (!createdUser) {
        throw new apiError(500, "sorry user is not register");
    }

    // step 7.
    return res
        .status(201)
        .json(new apiResponse(200, createdUser, "user is registed."));
});

const loginUser = asyncHandler(async(req,res)=>{
    // take the email/userName and password from the frontend;
    // check the user exists or not;
    // check the password;
    // create the access token and refresh token;
    // send cookies;
    // send response.

    // step 1;
    const {email, userName, password } = req.body;
    if (
        [email, password, userName].some(
            (field) => field?.trim() === "",
        )
    ) {
        throw new apiError(400, "All fields are required");
    }

    // step 2;
    const User = await user.findOne({
        $or: [{ email }, { userName }],
    });

    if(!User){
        throw new apiError(400,"user is not exits");
    }
    
    // step 3;
    const isPasswordValid = await User.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new apiError(401,"password is invalid");
    }

    // step 4;
    const { AccessToken, RefreshToken } = await generateAccessAndRefereshToken(
        User._id,
    );

    const loggedInUser = await user
        .findById(User._id)
        .select("-password -refreshToken");

    // step 5
    const options = {
        httpOnly: true,
        secure: true,
    };

    // step 6
    return res
        .status(200)
        .cookie("accessToken", AccessToken, options)
        .cookie("refreshToken", RefreshToken, options)
        .json(
            new apiResponse(
                200,
                { user: loggedInUser, AccessToken, RefreshToken },
                "user logged In successfully",
            ),
        );
})

export { registerUser, loginUser};
