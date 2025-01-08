import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        userName : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName:{
            type: String,
            require: true,
            lowercase: true,
            trim: true
        },
        password:{
            type: String,
            require: [true, "password is required"]
        }
    },{timestamps: true}
)

// Middleware to hash the password before saving the user document
//The middleware (pre("save")) runs automatically during that operation, but you still need to initiate the save process explicitly.
userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {   
        // If the password is not modified, skip hashing.
        next();
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt factor of 10.
    next();
});

export const user = mongoose.model("user",userSchema);