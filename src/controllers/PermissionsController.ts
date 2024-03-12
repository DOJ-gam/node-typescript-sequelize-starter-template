import { NextFunction, Request, Response } from "express";
import PermissionsService from "../services/permissionsService";
import permissionsResource from "../resourses/permissionsResource";
import ErrorResponse from "../utils/ErrorResponse";
import { NextType, RequestType, ResponseType } from "../types/types";
import rolesResource from "../resourses/rolesResource";
import { groupedPermissions, groupedUserPermissions } from "../utils/permissionHelper";

const permissionsService = new PermissionsService();

// @desc    Create Permission
// @route   POST /api/v1/permissions
// @access  Private -> admin
export const addPermission = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  const data = permissionsResource.addPermision(req.body);

  try {

    const permission = await permissionsService.create(data);
    return res.status(201).json({
      success: true,
      message: "Permissions created successfully",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Permission
// @route   GET /api/v1/permissions
// @access  Private -> admin
export const getAllPermissions = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  try {
    const permissions = await permissionsService.findAll(req?.queryParams);
    if (!permissions)
      return next(new ErrorResponse("No permissions found", 404));
    return res.status(200).json({
      success: true,
      count: permissions.length,
      message: "permissions fetched",
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Single Permission
// @route   GET /api/v1/permissions/:id
// @access  Private -> admin
export const getSinglePermission = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {

  try {
    const permission = await permissionsService.findById(
      req.params.id as unknown as number
    );
    if (!permission) return next(new ErrorResponse("No permission found", 404));
    return res.status(200).json({
      success: true,
      message: "Permission fetched",
      data: permission,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Get User Permissions
// @route   GET /api/v1/permissions/user?userId
// @access  Private -> admin
export const getUserPermissions = async (req: Request,
  res: Response,
  next: NextFunction) => {
  if (!req?.query?.userId)
    return next(new ErrorResponse("User ID Missen!", 400));
  try {
    const permissions: any = await permissionsService.getUserPermissions(
      req?.query?.userId as unknown as number
    );
    if (!permissions)
      return next(new ErrorResponse("No permission found", 404));
    // const perms = await groupedUserPermissions(permissions.permissions)
    const perms = await groupedPermissions(permissions.permissions)
    permissions.permissions = perms
    return res.status(200).json({
      success: true,
      message: "Permissions fetched",
      data: permissions,
      // data: perms,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Role Permissions
// @route   GET /api/v1/permissions/role?roleId
// @access  Private -> admin
export const getRolePermissions = async (req: Request,
  res: Response,
  next: NextFunction) => {
  if (!req?.query?.roleId)
    return next(new ErrorResponse("Role ID Missen!", 400));
  try {
    const permissions = await permissionsService.getRolePermissions(
      req?.query?.roleId as unknown as number
    );
    if (!permissions)
      return next(new ErrorResponse("No permission found", 404));
    return res.status(200).json({
      success: true,
      message: "Permissions fetched",
      data: permissions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Permission
// @route   PUT /api/v2/admin/permissions/:id
// @access  Private -> admin
export const updatePermissions = async (req: Request,
  res: Response,
  next: NextFunction) => {
  const data = permissionsResource.updatePermision(req.body);
  try {
    const permission = await permissionsService.update(
      req?.params?.id as unknown as number,
      data,
    );

    if (!permission)
      return next(new ErrorResponse("Error updating permission", 400));
    return res.status(202).json({
      success: true,
      message: "Permission Updated!",
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Delete Permissions
// @route   DELETE /api/v2/admin/permissions/:id
// @access  Private -> admin
export const deletePermission = async (req: Request,
  res: Response,
  next: NextFunction) => {

  try {
    const permission = await permissionsService.delete(
      req?.params?.id as unknown as number
    );

    if (!permission)
      return next(new ErrorResponse("Error Deleting permissions", 400));
    return res.status(200).json({
      success: true,
      message: "Permission Deleted!",
    });
  } catch (error) {
    return next(error);
  }
};
