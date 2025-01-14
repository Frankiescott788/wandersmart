import { Router } from "express";
import {currentUser, signIn, signUp} from "../controllers/users";
import useAuth from "../middleware/useAuth";

const routes = Router();

routes.post("/api/signup", signUp);
routes.post("/api/signin", signIn);
routes.get("/api/currentuser", useAuth, currentUser);

export default routes