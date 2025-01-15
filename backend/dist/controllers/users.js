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
exports.currentUser = exports.signIn = exports.signUp = void 0;
const users_1 = __importDefault(require("../model/users"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function Errors(err) {
    const errors = {
        username: "",
        email: "",
        password: ""
    };
    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach((err) => {
            if (err.properties.path === "username") {
                errors.username = err.properties.message;
            }
            if (err.properties.path === "email") {
                errors.email = err.properties.message;
            }
            if (err.properties.path === "password") {
                errors.password = err.properties.message;
            }
        });
    }
    if (err.code === 11000) {
        errors.email = "This is Email is already in use";
    }
    return errors;
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const createuser = yield users_1.default.create({
            user_id: (0, uuid_1.v4)(),
            username,
            email,
            password,
        });
        const token = jsonwebtoken_1.default.sign({ userId: createuser.user_id }, "telefunkencode100", {
            expiresIn: "7d",
        });
        res.cookie("authtoken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none"
        });
        res.status(201).json({
            message: "Account created",
            data: createuser,
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ err: Errors(err) });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const User = yield users_1.default.findOne({ email });
        if (!User) {
            return res.status(404).json({ err: "Email not found" });
        }
        const comparePassword = yield bcrypt_1.default.compare(password, User.password);
        if (!comparePassword) {
            return res.status(400).json({ err: "Wrong password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: User.user_id }, "telefunkencode100", {
            expiresIn: "7d",
        });
        res.cookie("authtoken", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.status(200).json({
            message: "User signed in",
            data: User,
        });
    }
    catch (err) {
        console.log(err.message);
    }
});
exports.signIn = signIn;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield users_1.default.findOne({ user_id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ err: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal server error",
            details: err.message,
        });
    }
});
exports.currentUser = currentUser;
