import express from "express";
import { addRole, addRolePermissions, deleteRole, getAllRoles, getSingleRole, updateRole, updateRolePermissions } from "../../controllers/RolesController";
import roleValidator from "../../validators/roleValidator";


const roleRoutes = express.Router();


roleRoutes.route("/").post(roleValidator.addRole, addRole).get(getAllRoles)
roleRoutes.post("/add-permissions", roleValidator.validateAddPermissionsToRole, addRolePermissions)
roleRoutes.put("/update-permissions", roleValidator.validateUpdatePermissionsToRole, updateRolePermissions)
roleRoutes.route("/:id").get(getSingleRole).put(updateRole).delete(deleteRole)

export default roleRoutes;
