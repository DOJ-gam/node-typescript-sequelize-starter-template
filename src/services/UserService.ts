import RoleModel from "../models/Role";
import UserModel, { UserModelAttributes } from "../models/User";
import userResource from "../resourses/userResource";
import { RegisterUserType } from "../types/userTypes";
import ErrorResponse from "../utils/ErrorResponse";
import AuthService from "./AuthService";


export default class UserService {
    async create(userData: RegisterUserType) {
        const authService = new AuthService()
        try {
            const createdUser = await authService.create(userData);
            return createdUser;
        } catch (error) {
            throw error;
        }
    }

    async findAll(query?: any) {
        try {
            const queryParams = query ? query : {}
            const users = await UserModel.findAll({ where: { ...queryParams }, ...userResource.response });
            return users;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number) {
        if (!id) throw new ErrorResponse("Error finding user, No data is provided", 404)
        try {
            const user = await UserModel.findByPk(id, { ...userResource.response });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<RegisterUserType>) {

        if (!id || !data) throw new ErrorResponse("Error updating user, No data is provided", 404)

        try {

            // get user
            const existingUserData = await UserModel.findByPk(id);
            if (!existingUserData) {
                throw new ErrorResponse('User not found', 404);
            }

            // prevent users from creating a new admin users
            if (data.roleId) {
                const role = await RoleModel.findOne({
                    where: { id: data.roleId },
                });
                if (!role) {
                    throw new ErrorResponse('Ivalid role id provided', 400);
                }
                if (role?.dataValues.name === "admin" && existingUserData.dataValues.roleId !== data.roleId) throw new ErrorResponse("You cannot create an admin user", 400)
            }

            const updatedData = await UserModel.update(data, { where: { id } });

            return updatedData;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        if (!id) throw new ErrorResponse("Error deleting user No data is provided", 404)

        try {
            const deletedUser = await UserModel.destroy({ where: { id } });
            if (!deletedUser) {
                throw new ErrorResponse('User not found', 404);
            }
            return { success: true, message: 'User deleted' };
        } catch (error) {
            throw error;
        }
    }

}
