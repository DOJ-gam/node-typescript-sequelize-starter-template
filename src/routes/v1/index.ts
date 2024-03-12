import express from "express";
import authRoutes from "./authRoutes";
import { authUser } from "../../middlewares/auth";
import roleRoutes from "./roleRoutes";
import permissionRoutes from "./permissionRoutes";
import userRoutes from "./userRoutes";
import logsRoutes from "./logsRoutes";

const v1Router = express.Router();

// auth
v1Router.use("/auth", authRoutes);


// All Below routes are protected
v1Router.use(authUser)

// users
v1Router.use("/users", userRoutes);

// roles
v1Router.use("/roles", roleRoutes);

// permissions
v1Router.use("/permissions", permissionRoutes);

// Logs
v1Router.use("/logs", logsRoutes);

export default v1Router;
