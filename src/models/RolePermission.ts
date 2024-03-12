import { DataTypes, Model } from "sequelize";
import db from "../config/db";
import RoleModel from "./Role";
import PermissionModel from "./Permission";

export interface RolePermissionModelAttributes {
    id: number | null,
    roleId: number,
    permissionId: number,
}

export default class RolePermissionModel extends Model<RolePermissionModelAttributes> {
    id!: number | null;
    roleId!: number;
    permissionId!: number;
}

RolePermissionModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        roleId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: false,
            references: {
                model: RoleModel,
                key: "id",
            },
        },
        permissionId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: false,
            references: {
                model: PermissionModel,
                key: "id",
            },
        }
    },
    {
        sequelize: db,
        tableName: "RolePermission",
        hooks: {}
    }
)

// RolePermissionModel.sync()