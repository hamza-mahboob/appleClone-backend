import express from "express";
import { addToCart, fetchCart } from "../controllers/cartController.js";
import { authWithToken } from "../middleware/middleware.js";

const route = express.Router();

route.post("/addtocart", authWithToken, addToCart);
route.get("/mycart", authWithToken, fetchCart);

export default route;
