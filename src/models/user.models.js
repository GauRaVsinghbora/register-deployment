import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

export const user = mongoose.model("user",userSchema);