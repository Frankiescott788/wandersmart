import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://localhost:27017/travelplanner");
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
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