import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true, lowercase: true, validate: [validator.isEmail, "Email is not valid format"] },
        password: {
            type: String,
            required: true,
            minlength: 8,
            validate: [validator.isStrongPassword, "Password must be 8 characters long."],
        },
        gender: { type: String, required: true },
        birthDate: { type: Date, required: true },
        imageURL: { type: String },
        role: { type: String, enum: ["admin", "superadmin", "user"] },
    },
    { timestamps: true }
);
export const user = mongoose.model("Users", userSchema);
