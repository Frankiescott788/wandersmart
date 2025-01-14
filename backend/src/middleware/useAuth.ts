import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import Users from "../model/users";

export default async function useAuth (req : Request, res : Response, next : NextFunction) : Promise<any>  {
    const { authtoken } = req.cookies;
    try {
        if (!authtoken) {
            return res.status(400).json({
                err : "Please provide a token"
            });
        }
        const verify = jwt.verify(authtoken, "telefunkencode100") as JwtPayload
        if (!verify) {
            return res.status(400).json({ err_msg : "This token is either valid or expired" })
        }
        const findUser = await Users.findOne({ user_id : verify.userId });
        if(!findUser) {
            return res.status(404).json({err : "User not found"});
        }
        req.userId = findUser.user_id;
        return next()
    } catch (err : any) {
        console.log(err.message);
        res.status(500).json({
            message : "Internal Server error",
            details : err.message
        });

    }
}