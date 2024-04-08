import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, min: [0, "Wrong Price"], required: true },
        brand: { type: String, required: true },
        classification: { type: String, required: true },
        rating: { type: Number, min: [0, "Wrong Minimum rating"], max: [5, "Wrong Maximum rating"], required: true },
        thumbnail: { type: String },
        stock: { type: Number, required: true },
        images: { type: [String] },
    },
    { timestamps: true }
);

export const product = mongoose.model("Products", productSchema);
