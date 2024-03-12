import userResource from "../resourses/userResource";
import UserService from "../services/UserService";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";
import logger, { logNames } from "../utils/logger";

const userService = new UserService();

// @desc    Add a user using admin account
// @route   POST /api/v1/users
// @access  Private -> admin
export const createUser = async (req: RequestType, res: ResponseType, next: NextType) => {
    const data = userResource.register(req.body);

    try {
        // create user in db
        const user = await userService.create(data);
        await logger({ req, logName: logNames.createUser, httpMethod: "POST", status: "Success" })
        return res.status(201).json({
            success: true,
            message: "User Account Created Successfully",
            data: user
        });
    } catch (error: any) {
        await logger({ req, logName: logNames.createUser, httpMethod: "POST", status: "Error", message: error.message })
        return next(error);
    }
};

// @desc    Get all Users
// @route   GET /api/v1/users
// @access  Private -> admin
export const getAllUsers = async (req: RequestType, res: ResponseType, next: NextType) => {
    try {
        const users = await userService.findAll(req.queryParams);

        if (!users) return next(new ErrorResponse("Error getting users", 500));
        await logger({ req, logName: logNames.getAllUsers, httpMethod: "GET", status: "Success" })
        return res.status(201).json({
            success: true,
            count: users.length,
            message: "Users fetched!",
            data: users,
        });
    } catch (error: any) {
        await logger({ req, logName: logNames.getAllUsers, httpMethod: "GET", status: "Error", message: error.message })
        return next(error);
    }
};

// @desc    Get Single User
// @route   GET /api/v1/users/:id
// @access  Private -> admin
export const getSingleUser = async (req: RequestType, res: ResponseType, next: NextType) => {
    const { id } = req.params;
    try {
        const user = await userService.findById(id as unknown as number);

        if (!user) return next(new ErrorResponse("Error getting user", 500));
        await logger({ req, logName: logNames.getSingleUser, httpMethod: "GET", status: "Success" })
        return res.status(200).json({
            success: true,
            message: "User fetched!",
            data: user,
        });
    } catch (error: any) {
        await logger({ req, logName: logNames.getSingleUser, httpMethod: "GET", status: "Error", message: error.message })
        return next(error);
    }
};

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private -> admin
export const updateUser = async (req: RequestType, res: ResponseType, next: NextType) => {

    try {
        const { id } = req.params
        const data = userResource.update(req.body);

        const user = await userService.update(id as unknown as number, data);

        if (!user) return next(new ErrorResponse("Error updating user", 500));
        await logger({ req, logName: logNames.updateUser, httpMethod: "PUT", status: "Success" })
        return res.status(202).json({
            success: true,
            message: "User Updated!",
        });
    } catch (error: any) {
        await logger({ req, logName: logNames.updateUser, httpMethod: "PUT", status: "Error", message: error.message })
        return next(error);
    }
};

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private -> admin
export const deleteUser = async (req: RequestType, res: ResponseType, next: NextType) => {
    const { id } = req.params;
    try {
        const user = await userService.delete(id as unknown as number);

        if (!user) return next(new ErrorResponse("Error Deleting user", 500));
        await logger({ req, logName: logNames.deleteUser, httpMethod: "DELETE", status: "Success" })
        return res.status(200).json({
            success: true,
            message: "User Deleted!",
        });
    } catch (error: any) {
        await logger({ req, logName: logNames.deleteUser, httpMethod: "DELETE", status: "Error", message: error.message })
        return next(error);
    }
};