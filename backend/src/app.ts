import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE as string);
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "https://travelwandersmart.vercel.app/",
    credentials : true
}));

const db = mongoose.connection;

db.on("error", () => {
    console.log("failed to connect to mongodb");
});
db.once("open", () => {
    app.listen(8080, () => {
        console.log("Server running and connected to database")
    });
    app.use(routes);
})