import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName:{
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            required: [true, "password is required"]
        },
        refreshToken:{
            type: String
        }
    },{timestamps: true}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {  // this will provide the every time harshing.
        // If the password is not modified, skip hashing.
        next();
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt factor of 10.
    next();
});

// Method to check if a given password matches the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // Returns true if passwords match, false otherwise.
};

// Method to generate an access token for the user
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id, // Include the user's ID in the token payload.
            email: this.email, // Include the user's email in the token payload.
            username: this.username, // Include the username in the token payload.
            fullname: this.fullname, // Include the full name in the token payload.
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token.
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Token expiration time (defined in environment variables).
        },
    );
};

// Method to generate a refresh token for the user
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id, // Include only the user's ID in the refresh token payload.
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the token.
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Token expiration time (defined in environment variables).
        },
    );
};




export const user = mongoose.model("user",userSchema);