import { Request, Response } from "express";
import Users from "../model/users";
import { User } from "../types/types";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function Errors(err: any) {

    const errors = {
        username : "",
        email : "",
        password : ""
    }

    if(err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach((err : any) => {
            if (err.properties.path === "username") {
                errors.username = err.properties.message;
            }
            if (err.properties.path === "email") {
                errors.email = err.properties.message;
            }
            if (err.properties.path === "password") {
                errors.password = err.properties.message;
            }
        })
    }

    if(err.code === 11000) {
        errors.email = "This is Email is already in use"
    }

    return errors
}

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password }: User = req.body;
  try {
    const createuser = await Users.create({
      user_id: v4(),
      username,
      email,
      password,
    });

    const token = jwt.sign(
      { userId: createuser.user_id },
      "telefunkencode100",
      {
        expiresIn: "7d",
      }
    );

    res.cookie("authtoken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure : true,
      httpOnly : true,
      sameSite : "none"
    });
    res.status(201).json({
      message: "Account created",
      data: createuser,
      token
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({err : Errors(err)})
  }
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const User = await Users.findOne({ email });

    if (!User) {
      return res.status(404).json({ err: "Email not found" });
    }

    const comparePassword = await bcrypt.compare(password, User.password);
    if (!comparePassword) {
      return res.status(400).json({ err: "Wrong password" });
    }

    const token = jwt.sign({ userId: User.user_id }, "telefunkencode100", {
      expiresIn: "7d",
    });

    res.cookie("authtoken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure : true,
      httpOnly : true,
      sameSite : "none",
    });
    res.status(200).json({
      message: "User signed in",
      data: User,
      token
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const currentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;
    const user = await Users.findOne({ user_id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    res.status(200).json(user);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
      details: err.message,
    });
  }
};
