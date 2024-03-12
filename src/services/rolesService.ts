import { Op } from "sequelize";
import PermissionModel, { PermissionModelAttributes } from "../models/Permission";
import RoleModel, { RoleModelAttributes } from "../models/Role";
import RolePermissionModel, { RolePermissionModelAttributes } from "../models/RolePermission";
import rolesResource from "../resourses/rolesResource";
import ErrorResponse from "../utils/ErrorResponse";
import AppService from "./AppService";

const roleService = new AppService<RoleModel>(RoleModel, rolesResource.response,)

export default class RolesService {
  // create Role
  async create(data: Omit<RoleModelAttributes, "id">) {
    const { name, description } = data;

    try {
      // check if role exists
      const roleExists = await RoleModel.findOne({
        where: { name },
      });
      if (roleExists)
        throw new ErrorResponse(
          "Error Creating Role, Role Already Exists!",
          400
        );

      // create role
      const createdRole = await RoleModel.create({
        name,
        description,
      });

      if (!createdRole)
        throw new ErrorResponse(
          "Error Creating Role, Please Check Your Request and Try Again!",
          400
        );

      return createdRole;
    } catch (error) {
      throw error;
    }
  }

  groupPermissionsByParent(permissions: PermissionModelAttributes[]) {
    const groupedPermissions: any = {};

    permissions.forEach((permission: any) => {
      const parent = permission.parent || 'default'; // Use 'default' if parent is null
      if (!groupedPermissions[parent]) {
        groupedPermissions[parent] = [];
      }

      const transformedPermission = {
        id: permission.id,
        name: permission.name,
        description: permission.description,
        // RolePermission: permission.RolePermission,
      };

      groupedPermissions[parent].push(transformedPermission);
    });

    return groupedPermissions;
  };



  // find all roles
  async findAll(query: any) {
    try {
      const roles = await roleService.findAll(query);
      if (!roles) throw new ErrorResponse("No data found", 404);

      // Transform the data for response
      // const rolesWithPermissions = roles.map((role: any) => {
      //   const transformedRole = role.toJSON();
      //   transformedRole.permissions = this.groupPermissionsByParent(transformedRole.permissions);
      //   return transformedRole;
      // });
      // return rolesWithPermissions;
      return roles;
    } catch (error) {
      throw error;
    }
  }

  // find role by ID
  async findById(id: number) {
    try {
      const role = await roleService.findById(id);
      if (!role) throw new ErrorResponse("Cannot find role: " + id, 404);
      return role;
    } catch (error) {
      throw error;
    }
  }

  // find role by name
  async findByName(name: string) {
    if (!name) return;
    try {
      const role = await RoleModel.findOne({
        where: { name: name },
        ...rolesResource.response,
      });
      if (!role) throw new ErrorResponse("No data found", 404);;
      return role;
    } catch (error) {
      throw error;
    }
  }

  // update role
  async update(id: number, data: Partial<RoleModelAttributes>) {
    if (!id || !data)
      throw new ErrorResponse("Cannot Update, No Data Provided!", 400);
    try {
      const updatedRole = await roleService.update(id, data);
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  // delete role
  async delete(id: number) {
    try {
      const roleDeleted = await roleService.delete(id)
      if (!roleDeleted) throw new ErrorResponse("Cannot Delete, Error Deleting", 404);;
      return roleDeleted;
    } catch (error) {
      throw error;
    }
  }

  // Add permissions to a role by role ID
  async addPermissionsToRole(roleId: number, permissionNames: string[]) {

    try {
      // Find the role by ID
      const role = await this.findById(roleId);

      if (!role) {
        throw new ErrorResponse("Role not found.", 404);
      }

      // Find the permissions by their IDs
      const permissions = await PermissionModel.findAll({
        where: { name: permissionNames, }
      });

      if (permissions.length === 0) {
        throw new ErrorResponse("No matching permissions found.", 404);
      }

      // Create records in the RolePermission junction table
      await RolePermissionModel.bulkCreate(
        permissions?.map((permission) => ({
          roleId: role?.id,
          permissionId: permission?.id,
        }) as RolePermissionModelAttributes)
      );

      return {
        role,
        new: permissions,
      };
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      throw error;
    }
  }

  // update role permissions
  async updateRolePermissions(roleId: number, permissionNames: string[]) {
    try {
      // Find the role by ID
      const role = await this.findById(roleId) as RoleModel & { permissions: PermissionModel[] };

      if (!role) {
        throw new ErrorResponse("Role not found.", 404);
      }

      // Find the existing permissions for the role
      const existingPermissions: any = await PermissionModel.findAll({
        where: {
          id: {
            [Op.in]: role.permissions.map((permission) => permission.id as number),
          }
        },
      });

      // Find the permissions by their names
      const newPermissions = await PermissionModel.findAll({
        where: {
          name: permissionNames,
        },
      });

      if (newPermissions.length === 0) {
        throw new ErrorResponse("No matching permissions found.", 404);
      }

      // Determine which permissions to add and remove
      const permissionsToAdd = newPermissions.filter(
        (permission) =>
          !existingPermissions.some(
            (existingPermission: any) => existingPermission.id === permission.id
          )
      );

      const permissionsToRemove = existingPermissions.filter(
        (existingPermission: any) =>
          !newPermissions.some(
            (permission) => permission.id === existingPermission.id
          )
      );

      // Create records in the RolePermission junction table for new permissions
      await RolePermissionModel?.bulkCreate(
        permissionsToAdd?.map((permission) => ({
          roleId: role?.id,
          permissionId: permission?.id,
        }) as RolePermissionModelAttributes)
      );

      // Remove records from the RolePermission junction table for permissions to remove
      await RolePermissionModel.destroy({
        where: {
          roleId: role?.id as number,
          permissionId: permissionsToRemove?.map((permission: any) => permission.id),

        }
      });

      return {
        // role,
        added: permissionsToAdd,
        removed: permissionsToRemove,
      };
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      throw error;
    }
  }


}

