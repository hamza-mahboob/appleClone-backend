import bodyparser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import logger from "logger";
import morgan from "morgan";

import { db } from "./configuration/connection.js";

import userRoute from "./Routes/user.js";
import productoute from "./Routes/product.js";
import cartRoute from "./Routes/cart.js";

dotenv.config();
const app = express();
app.use(cors());
// app.use(logger());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/user/", userRoute);
app.use("/products/", productoute);
app.use("/cart/", cartRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server is created at: http://localhost:${port}`);
});
