"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: [true, "User ID is required"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator_1.isEmail, "Please enter a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must have the minimum of 6 characters"]
    }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            this.password = yield bcrypt_1.default.hash(this.password, yield bcrypt_1.default.genSalt(10));
            next();
        }
        catch (e) {
            console.log(e.message);
            next();
        }
    });
});
const Usermodel = (0, mongoose_1.model)("users", userSchema);
exports.default = Usermodel;
