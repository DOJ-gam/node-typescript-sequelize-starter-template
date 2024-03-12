import LogsModel from "./Logs";
import PermissionModel from "./Permission";
import RoleModel from "./Role";
import RolePermissionModel from "./RolePermission";
import UserModel from "./User";

// create models(list according to how they depend on each other)
const createTables = async () => {
  RoleModel.sync();
  PermissionModel.sync();
  RolePermissionModel.sync();
  UserModel.sync();
  LogsModel.sync();
}
// createTables()

// user associations
UserModel.belongsTo(RoleModel, { foreignKey: "roleId", as: "role" });

// role associations
RoleModel.belongsToMany(PermissionModel, {
  through: "RolePermission",
  as: "permissions",
  foreignKey: "roleId",
});
// RoleModel.hasMany(UserModel, { foreignKey: "roleId", as: "users" })

// permission associations
PermissionModel.belongsToMany(RoleModel, {
  through: "RolePermission",
  as: "roles",
  foreignKey: "permissionId",
});

// logs associations
LogsModel.belongsTo(UserModel, { foreignKey: "userId", as: "user" })