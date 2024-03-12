import { Order } from "sequelize";
import { LoginUserType, RegisterUserType } from "../types/userTypes";
import RoleModel from "../models/Role";
import rolesResource from "./rolesResource";

type ResponseType = {
  order: Order;
  include: (
    | {
      model: typeof RoleModel;
      as: string;
      attributes: string[];
    }


  )[];
};

const response: ResponseType = {
  order: [["id", "DESC"]],
  include: [
    {
      model: RoleModel,
      as: "role",
      ...rolesResource.response
      // attributes: ["id", "name", "description"],

    },

  ],
};


const register = (body: RegisterUserType) => {
  return {
    firstName: body.firstName,
    middleName: body.middleName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    password: body.password,
    roleId: null,
    role: body.role,
    status: body.status || "inactive"
  };
};

const update = (body: RegisterUserType) => {
  return {
    ...register(body),
    roleId: body.roleId,
  };
};
const login = (body: LoginUserType) => {
  return {
    email: body.email,
    password: body.password,
  };
};

const userResource = {
  register,
  update,
  login,
  response,
};

export default userResource;
