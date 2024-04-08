import express from "express";
import { getData, getDataById, deleteData, updateUser, userLogin, register } from "../controllers/userController.js";
import { authWithToken } from "../middleware/middleware.js";

const route = express.Router();

route.post("/register", register);
route.get("/users", authWithToken, getData);
route.get("/user/:id", getDataById);
route.delete("/deleteuser/:id", deleteData);
route.put("/updateuser/:id", updateUser);
route.post("/login", userLogin);

export default route;
