import { user } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { firstName, lastName, userName, email, password, gender, birthDate, imageURL, role } = req.body;
    try {
        const existEmail = await user.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: "Email Already exists." });
        }
        // hashed password
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new user({ firstName, lastName, userName, email, password: hashpassword, gender, birthDate, imageURL, role });
        await newUser.save();
        return res.status(201).json({ data: newUser });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getData = async (req, res) => {
    try {
        const userData = req.user.id;
        const data = await user.find();
        // const data = await user.find().select("name");
        res.status(200).json({ id: userData, data: data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getDataById = async (req, res) => {
    try {
        const data = await user.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteData = async (req, res) => {
    try {
        const data = await user.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "Selected User is deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, userName, email, password } = req.body;
        const updateData = await user.findByIdAndUpdate(id, { name, userName, email, password }, { new: true });
        if (!updateData) {
            return res.status(404).json("User not found");
        }
        res.json(updateData);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userLogin = await user.findOne({ email });
        if (!email) {
            return res.status(404).json({ messgae: "User is not registered." });
        }
        const isMatched = await bcrypt.compare(password, userLogin.password);
        if (!isMatched) {
            return res.status(401).json({ message: "Enter currect password" });
        }
        // JWT Token
        const token = await jwt.sign({ id: userLogin.id, userName: userLogin.userName }, process.env.SECRET_KEY, { expiresIn: "1d" });
        const decoded = jwt.decode(token);
        console.log("user logged in successfully");
        res.json({ token: token, decoded: decoded.id, message: " LogggedIn succefully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
