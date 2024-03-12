import rolesResource from "../resourses/rolesResource";
import RolesService from "../services/rolesService";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";



const rolesService = new RolesService();

// @desc    Create Role
// @route   POST /api/v1/roles
// @access  Private -> admin
export const addRole = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {

  try {
    const data = rolesResource.add(req.body);

    const role = await rolesService.create(data);
    return res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Role
// @route   GET /api/v1/roles
// @access  Private -> admin
export const getAllRoles = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  try {
    const roles = await rolesService.findAll(req?.queryParams);
    if (!roles) return next(new ErrorResponse("No roles found", 404));
    return res.status(200).json({
      success: true,
      count: roles.length,
      message: "roles fetched",
      data: roles,
    });
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error);
  }
};

// @desc    Get Single Role
// @route   GET /api/v1/roles/:id
// @access  Private -> admin
export const getSingleRole = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  try {
    const role = await rolesService.findById(req?.params?.id as unknown as number);
    if (!role) return next(new ErrorResponse("No role found", 404));
    return res.status(200).json({
      success: true,
      message: "Role fetched",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Role
// @route   PUT /api/v1/roles/:id
// @access  Private -> admin
export const updateRole = async (req: RequestType,
  res: ResponseType,
  next: NextType) => {
  try {
    const data = rolesResource.update(req.body);
    const role = await rolesService.update(
      req?.params?.id as unknown as number,
      data,
    );

    if (!role) return next(new ErrorResponse("Error updating role", 400));
    return res.status(202).json({
      success: true,
      message: "Role Updated!",
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete Role
// @route   DELETE /api/v1/roles/:id
// @access  Private -> admin
export const deleteRole = async (req: RequestType,
  res: ResponseType,
  next: NextType) => {
  try {
    const role = await rolesService.delete(req?.params?.id as unknown as number);

    if (!role) return next(new ErrorResponse("Error Deleting Role", 400));
    return res.status(200).json({
      success: true,
      message: "Role Deleted!",
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Add Permissions Role
// @route   POST /api/v1/roles/add-permissions
// @access  Private -> admin
export const addRolePermissions = async (req: RequestType,
  res: ResponseType,
  next: NextType) => {
  const data = rolesResource.addRolePermissions(req.body);
  try {
    const role = await rolesService.addPermissionsToRole(data.roleId, data.permissionNames);
    return res.status(201).json({
      success: true,
      message: "Role permissions created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Role Permissions
// @route   PUT /api/v2/admin/roles/update-permissions?roleId=id
// @access  Private -> admin
export const updateRolePermissions = async (req: RequestType,
  res: ResponseType,
  next: NextType) => {
  const { permissionNames } = req.body; // Extract permissionNames from request body
  if (!req?.query?.roleId)
    return next(new ErrorResponse("roleId ID Missen!", 400));

  try {
    // Call the service function to update role permissions
    const updatedRole = await rolesService.updateRolePermissions(req?.query?.roleId as unknown as number,
      permissionNames,
    );

    if (!updatedRole) {
      return next(new ErrorResponse("Error updating role permissions", 400));
    }

    return res.status(202).json({
      success: true,
      message: "Role permissions updated successfully",
      data: updatedRole,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return next(error);
  }
};
