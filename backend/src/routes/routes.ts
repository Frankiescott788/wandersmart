import { Router } from "express";
import {currentUser, signIn, signUp} from "../controllers/users";
import useAuth from "../middleware/useAuth";
import { Request, Response } from "express";
import { places } from "../places/data";

const routes = Router();

routes.post("/api/signup", signUp);
routes.post("/api/signin", signIn);
routes.get("/api/currentuser", useAuth, currentUser);

routes.get("/api/places", useAuth, (req: Request, res: Response) => {
    res.status(200).json(places);
})

export default routes