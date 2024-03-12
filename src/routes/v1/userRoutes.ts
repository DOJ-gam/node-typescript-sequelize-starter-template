import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../../controllers/UserController";
import userValidator from "../../validators/userValidator";
import queryParams from "../../middlewares/queryParams";
import { checkUserPermission } from "../../middlewares/auth";


const userRoutes = express.Router();

const acceptedQueries = [
    "firstName",
    "middleName",
    "lastName",
    "fullName",
    "email",
    "phone",
];

userRoutes.route("/")
    .get(
        checkUserPermission("getUsers"),
        queryParams(
            acceptedQueries,
            "User",
        ), getAllUsers)
    .post(userValidator.register, createUser)
userRoutes.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser)

export default userRoutes;
