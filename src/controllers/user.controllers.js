import { asyncHandler } from "../utils/asyncHandler.js";
import { user, user } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // get the data from the frontend.
    // check every feilds required. (validation)
    // check if user already exits.
    // create user objects  -create entry in database.
    // remove password and refresh token field from response.
    // check for user creation.
    // return res.

    // step 1.
    const { fullName, email, password, userName } = req.body;

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
        userName: userName.toLowercase(),
        password,
        email,
    });

    // step 5.
    const createdUser = await user.findById(User._id).select("-password");

    // step 6.
    if (!createdUser) {
        throw new apiError(500, "sorry user is not register");
    }

    // step 7.
    return res
        .status(201)
        .json(new apiResponse(200, createdUser, "user is registed."));
});

export { registerUser };
