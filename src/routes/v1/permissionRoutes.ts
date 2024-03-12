import express from "express";
import { addPermission, deletePermission, getAllPermissions, getRolePermissions, getSinglePermission, getUserPermissions, updatePermissions } from "../../controllers/PermissionsController";
import roleValidator from "../../validators/roleValidator";


const permissionRoutes = express.Router();


permissionRoutes.route("/").post(roleValidator.addPermission, addPermission).get(getAllPermissions)
permissionRoutes.get("/user", getUserPermissions)
permissionRoutes.get("/role", getRolePermissions)
permissionRoutes.route("/:id").get(getSinglePermission).put(roleValidator.updatePermission, updatePermissions).delete(deletePermission)


export default permissionRoutes;
