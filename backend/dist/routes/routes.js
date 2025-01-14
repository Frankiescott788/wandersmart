"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const useAuth_1 = __importDefault(require("../middleware/useAuth"));
const data_1 = require("../places/data");
const routes = (0, express_1.Router)();
routes.post("/api/signup", users_1.signUp);
routes.post("/api/signin", users_1.signIn);
routes.get("/api/currentuser", useAuth_1.default, users_1.currentUser);
routes.get("/api/places", useAuth_1.default, (req, res) => {
    res.status(200).json(data_1.places);
});
exports.default = routes;
