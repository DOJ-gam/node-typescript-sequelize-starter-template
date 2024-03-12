import jwt from "jsonwebtoken";
import { NextType, RequestType, ResponseType } from "../types/types";
import ErrorResponse from "../utils/ErrorResponse";
import UserModel from "../models/User";
import userResource from "../resourses/userResource";

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
     next(new ErrorResponse("Authentication failed", 401));
  }
};


// exports.checkUserPermission = (requiredPermission) => {
//   return async (req, res, next) => {
//     const { roleId } = req.admin;
//     try {
//       const role = await db.role.findOne({
//         where: { id: roleId },
//         ...roleResponse,
//       });

//       if (
//         !role.permissions.some(
//           (permission) => permission.permName === requiredPermission
//         )
//       ) {
//         return res
//           .status(403)
//           .json({ message: `Unauthorized to ${requiredPermission}` });
//       }

//       next(); // User has the required permission, proceed to the route handler
//     } catch (error) {
//       console.log("====================================");
//       console.log(error);
//       console.log("====================================");
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
// };
