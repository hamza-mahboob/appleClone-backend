import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.URL;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected.");
    });

export const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Failed"));
