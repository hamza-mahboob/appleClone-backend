import express from "express";
import { addProduct, getProducts } from "../controllers/productController.js";

const route = express.Router();

route.post("/addproduct", addProduct);
route.get("/products", getProducts);

export default route;
