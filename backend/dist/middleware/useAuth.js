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
exports.default = useAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../model/users"));
function useAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const authtoken = req.cookies.authtoken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        try {
            if (!authtoken) {
                return res.status(400).json({
                    err: "Please provide a token"
                });
            }
            const verify = jsonwebtoken_1.default.verify(authtoken, "telefunkencode100");
            if (!verify) {
                return res.status(400).json({ err_msg: "This token is either valid or expired" });
            }
            const findUser = yield users_1.default.findOne({ user_id: verify.userId });
            if (!findUser) {
                return res.status(404).json({ err: "User not found" });
            }
            req.userId = findUser.user_id;
            return next();
        }
        catch (err) {
            console.log(err.message);
            res.status(500).json({
                message: "Internal Server error",
                details: err.message
            });
        }
    });
}
