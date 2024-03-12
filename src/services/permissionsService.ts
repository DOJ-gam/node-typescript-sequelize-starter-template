import { Op } from "sequelize";
import PermissionModel, { PermissionModelAttributes } from "../models/Permission";
import RoleModel from "../models/Role";
import rolesResource from "../resourses/rolesResource";
import ErrorResponse from "../utils/ErrorResponse";
import AppService from "./AppService";
import UserService from "./UserService";

;

type CreatePermissionType = Omit<PermissionModelAttributes, "id">[]

const permissionService = new AppService<PermissionModel>(PermissionModel)

export default class PermissionsService {
  // create Permission
  async create(data: CreatePermissionType) {


    if (!Array.isArray(data))
      throw new ErrorResponse(
        "data has to be an array of permissions",
        400
      );

    let createdPermission = [];
    try {

      // create Permission
      for (const perm of data) {
        const existingRecord = await PermissionModel.findOne({
          where: { name: perm.name },
        });

        if (!existingRecord) {
          // set parent to lowercase
          // if (perm.parent) {
          //   perm.parent = perm.parent.toLowerCase()
          // }

          // check if parentId exists
          // if (perm.parent) {
          //   const parentExists = await PermissionModel.findOne({ where: { name: perm.parent } })
          //   if (!parentExists) throw new ErrorResponse(`Permission Parent Name: ${perm.parent} does not exists`, 404)
          // }

          const insertedRecord = await PermissionModel.create(perm);
          createdPermission.push(insertedRecord);
        }
      }
      // createdPermission = await db.permission.bulkCreate(data);


      if (!createdPermission)
        throw new ErrorResponse(
          "Error Creating Permission, Please Check Your Request and Try Again!",
          400
        );

      return createdPermission;
    } catch (error) {
      throw error;
    }
  }
  // find all permissions
  async findAll(query: any) {
    try {
      const permissions = await permissionService.findAll(query);
      if (!permissions) throw new ErrorResponse("No data found", 404);
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  // find permission by ID
  async findById(id: number) {

    try {
      const permission = await permissionService.findById(id);
      if (!permission) throw new ErrorResponse("Cannot find permission: " + id, 404);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  // find permission by name
  async findByName(name: string) {
    if (!name) throw new ErrorResponse(
      "No name provided",
      404
    );;
    try {
      const permission = await PermissionModel.findOne({
        where: { name: name },
      });
      if (!permission) throw new ErrorResponse("Cannot find permission: " + name, 404);
      return permission;
    } catch (error) {
      throw error;
    }
  }

  // get user permissions
  async getUserPermissions(userId: number) {
    const userService = new UserService();
    if (!userId) throw new ErrorResponse(
      "No userId provided",
      404
    );;
    try {

      // check for user
      const user = await userService.findById(userId);
      if (!user)
        throw new ErrorResponse(
          "Error getting user permissions, user not found!",
          404
        );
      // get role and permissions
      const role = await RoleModel.findOne({
        where: { id: user.roleId },
        ...rolesResource.response,
      });
      // if (!role?.permissions) return;
      // return role.permissions;
      if (!role) throw new ErrorResponse(
        "No Role permissions found!",
        404
      );;
      const res = {
        userId: user.id,
        fullname: user.fullName,
        ...role.dataValues,
      };
      return res;
    } catch (error) {
      throw error;
    }
  }
  // get role permissions
  async getRolePermissions(roleId: number) {
    if (!roleId) throw new ErrorResponse(
      "No roleId provided",
      404
    );;
    try {
      // get role and permissions
      const role = await RoleModel.findOne({
        where: { id: roleId },
        ...rolesResource.response,
      });
      if (!role) return;
      return role;
    } catch (error) {
      throw error;
    }
  }

  // update permission
  async update(id: number, data: Partial<PermissionModelAttributes>) {
    if (!id || !data)
      throw new ErrorResponse("Cannot Update, No Data Provided!", 400);
    try {
      // check if permissionId exits
      const permission = await PermissionModel.findOne({
        where: { id },
      });
      if (!permission)
        throw new ErrorResponse(
          "Cannot Update, permission does not exist!",
          404
        );

      // check if permission exists and not the same as current one
      if (data?.name) {
        const permissionExists = await PermissionModel.findOne({
          where: { name: data?.name, id: { [Op.ne]: id } },
        });
        if (permissionExists)
          throw new ErrorResponse(
            "Error Updating Permission, Permission Already Exists!",
            400
          );
      }

      // if (data.parent) {
      //   data.parent = data.parent.toLowerCase()
      // }
      // check if parentId exists
      // if (data.parent) {
      //   const parentExists = await PermissionModel.findOne({ where: { name: data.parent } })
      //   if (!parentExists) throw new ErrorResponse(`Permission Parent Name: ${data.parent} does not exists`, 404)
      // }

      const updatedPermission = await PermissionModel.update(
        { ...data },
        { where: { id } }
      );
      return updatedPermission;
    } catch (error) {
      throw error;
    }
  }

  // delete permission
  async delete(id: number) {
    if (!id) throw new ErrorResponse("No Id Provided", 404);
    try {
      const permission = await PermissionModel.findOne({
        where: { id },
      });
      if (!permission)
        throw new ErrorResponse(
          "Cannot Delete, permission does not exist!",
          404
        );

      const permissionDeleted = await PermissionModel.destroy({
        where: { id },
      });
      if (!permissionDeleted) return;
      return permissionDeleted;
    } catch (error) {
      throw error;
    }
  }
}

