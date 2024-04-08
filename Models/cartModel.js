import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],

    totalPrice: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: 0 },
});

export const cart = mongoose.model("Cart", cartSchema);

// user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
// product: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
// quantity: { type: Number, required: true },
