import express from "express";

import userValidator from "../../validators/userValidator";
import { RegisterUser, getMe, loginUser } from "../../controllers/authController";
import { authUser } from "../../middlewares/auth";

const authRoutes = express.Router();

authRoutes.post("/register", userValidator.register, RegisterUser);
authRoutes.post("/login", userValidator.login, loginUser);
authRoutes.get("/me", authUser, getMe);

export default authRoutes;
