import { Order } from "sequelize";
import PermissionModel, { PermissionModelAttributes } from "../models/Permission";
import { RoleModelAttributes } from "../models/Role";


type ResponseType = {
  order: Order;
  attributes: string[];
  include: (
    | {
      model: typeof PermissionModel;
      as: string;
      attributes: string[];
      through?: { attributes: [] },
    }

  )[];
};

export const response: ResponseType = {
  order: [["id", "DESC"]],

  attributes: ["id", "name", "description"],
  include: [
    {
      model: PermissionModel,
      as: "permissions",
      attributes: ["id", "name", "description", "parent"],
      through: { attributes: [] }
    },
  ],
};

const add = (body: RoleModelAttributes) => {
  return {
    name: body.name,
    description: body.description,
  };
};
const update = (body: RoleModelAttributes) => {
  return {
    name: body.name,
    description: body.description
  };
};
const addRolePermissions = (body: { roleId: number, permissionNames: string[] }) => {
  return {
    roleId: body.roleId,
    permissionNames: body.permissionNames,
  };
};
export default {
  response,
  add,
  update,
  addRolePermissions
}


