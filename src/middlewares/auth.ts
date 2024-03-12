import jwt from "jsonwebtoken";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";
import UserModel from "../models/User";
import userResource from "../resourses/userResource";
import RoleModel from "../models/Role";
import rolesResource from "../resourses/rolesResource";
import PermissionModel from "../models/Permission";

export const authUser = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
      return next(new ErrorResponse("Not Authorized to access this route", 402));
    }

    if (typeof authHeader !== 'string') {
      return next(new ErrorResponse("Not Authorized to access this route", 402));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new ErrorResponse("Not Authorized to access this route", 402));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");

    const user = await UserModel.findOne({
      where: { id: decoded?.id },
      ...userResource.response
    });

    if (!user) {
      return next(new ErrorResponse("User does not exist", 402));
    }

    delete user.dataValues.password;
    req.auth = user;
    next();
  } catch (error) {
    next(error)
    // next(new ErrorResponse("Authentication failed", 401));
  }
};


export const checkUserPermission = (requiredPermission: string) => {
  return async (req: RequestType, res: ResponseType, next: NextType) => {
    if (!req?.auth) throw new ErrorResponse(`Authorization for '${requiredPermission || "user"}' failed,  User not Authenticated!`, 402)
    const { roleId } = req?.auth;
    try {
      const permissions = await PermissionModel.findAll({
        where: { id: roleId },
      });
      if (!permissions || !permissions?.length) throw new ErrorResponse(`Authorization failed, No permissions found  for the given role`, 403);

      if (
        !permissions.some(
          (permission) => permission.name === requiredPermission
        )
      ) {
        return res
          .status(403)
          .json({ message: `Unauthorized to perform action: ${requiredPermission}` });
      }

      next(); // User has the required permission, proceed to the route handler
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      next(error)
      // next(new ErrorResponse("Authorization failed", 403));
    }
  };
};
