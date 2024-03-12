import RoleModel from "../models/Role";
import UserModel from "../models/User";
import userResource from "../resourses/userResource";
import { RequestType } from "../types/types";
import { RegisterUserType } from "../types/userTypes";
import ErrorResponse from "../utils/ErrorResponse";
import getClientIp from "../utils/getClientIp";
import LogsService from "./LogsService";

const logger = new LogsService()
export default class AuthService {
  // create user
  async create(data: RegisterUserType) {
    try {
      // prevent users from creating admin users
      if (data.role === "admin") throw new ErrorResponse("You cannot create an admin user", 400)
      // check if user exists
      const userExists = await UserModel.findOne({
        where: { email: data.email },
      });
      if (userExists) throw new ErrorResponse("User already exists", 400);

      // check role using roleId
      if (!data.role) throw new ErrorResponse("Role not provided", 404)


      const role = await RoleModel.findOne({ where: { name: data.role } })
      if (!role) throw new ErrorResponse(`Role ${data.role} not found.`, 404)
      data.roleId = role.dataValues.id
      data.role = null

      //  create
      const user = await UserModel.create(data);


      if (!user) throw new ErrorResponse("Error creating user", 400);

      // delete password from response
      delete user.dataValues.password;

      return user;
    } catch (error) {
      throw error;
    }
  }

  // login user
  async login({ email, password }: { email: string; password: string }) {
    try {
      // check if user exists
      const user = await UserModel.findOne({
        where: { email },
        ...userResource.response
      });
      if (!user) throw new ErrorResponse("Invalid user or password", 400);

      if (user.dataValues.status !== "active") throw new ErrorResponse("User accont is inactive, Please contact admin.", 400)

      // check if passwords match
      const isMatched = await user.matchPassword(password);
      if (!isMatched) throw new ErrorResponse("Invalid credentials", 401);

      // delete password from response
      delete user.dataValues.password;

      // get token
      const token = user.getSignedJwtToken();


      return {
        token,
        user,
      };
    } catch (error) {
      throw error;
    }
  }
}
