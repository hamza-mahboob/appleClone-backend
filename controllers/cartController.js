import { cart } from "../Models/cartModel.js";
import { product } from "../Models/productModel.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.query.productId;
        const quantity = req.body.quantity;

        let myCart = await cart.findOne({ userId });

        if (!myCart) {
            myCart = new cart({ userId, products: [] });
        }

        const existingProductIndex = myCart.products.findIndex((item) => item.product.equals(productId));

        if (existingProductIndex !== -1) {
            // Updated line: Ensure that the quantity is properly added to the existing product quantity
            myCart.products[existingProductIndex].quantity += quantity;
        } else {
            const findProduct = await product.findById(productId);
            if (!findProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            // Ensure that the quantity is set properly when adding a new product to the cart
            myCart.products.push({ product: productId, quantity });
        }

        // Update totalProducts and totalQuantity
        myCart.totalProducts = myCart.products.length;
        myCart.totalQuantity = myCart.products.reduce((acc, curr) => acc + curr.quantity, 0);
        myCart.totalPrice = 0;

        await myCart.save();

        res.json({ message: "Product added to cart successfully", myCart: myCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartId = await cart.findOne({ userId });
        const cartItem = await cart
            .findById(cartId)
            .populate({
                path: "userId", // Assuming userId is the reference field for the user
                select: "name email userName", // Specify the fields to populate for the user
            })
            .populate({
                path: "products.product", // Assuming 'products' is the array and 'product' is the reference field for the product
                select: "title price brand description", // Specify the fields to populate for the product
            });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart does not exist" });
        }
        // Compute total price
        let totalPrice = 0;
        for (const productItem of cartItem.products) {
            totalPrice += productItem.product.price * productItem.quantity;
        }

        // Update totalPrice field in the cart schema
        cartItem.totalPrice = totalPrice;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// const cartItem = await cart.findById(cartId).populate("user", "name email userName").populate("product", "name price description");
