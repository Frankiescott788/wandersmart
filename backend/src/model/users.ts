import { Schema, model } from "mongoose";
import {User} from "../types/types";
import {isEmail} from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema<User>({
    user_id : {
        type : String,
        required : [true, "User ID is required"],
        unique : true
    },
    username : {
        type : String,
        required : [true, "Username is required"],
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        validate : [isEmail, "Please enter a valid email"],
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : [6, "Password must have the minimum of 6 characters"]
    }
}, { timestamps : true});

userSchema.pre("save", async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
        next();
    } catch (e : any) {
        console.log(e.message);
        next()
    }
});

const Usermodel = model("users", userSchema);

export default Usermodel