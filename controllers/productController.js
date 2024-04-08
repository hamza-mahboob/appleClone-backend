import { product } from "../Models/productModel.js";

export const addProduct = async (req, res) => {
    const { title, price, description, brand, classification, rating, thumbnail, stock, images } = req.body;
    try {
        const newProduct = new product({ title, price, description, brand, classification, rating, thumbnail, stock, images });
        await newProduct.save();
        return res.status(201).json({ product: newProduct });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getProducts = async (req, res) => {
    try {
        const data = await product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
