import { DataTypes, Model } from "sequelize";
import db from "../config/db";

export interface PermissionModelAttributes {
    id: number | null,
    // parent: number | null,
    name: string,
    description: string
}

export default class PermissionModel extends Model<PermissionModelAttributes> {
    id!: number | null;
    // parent!: number | null;
    name!: string;
    description!: string;
}

PermissionModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // parent: {
        //     allowNull: true,
        //     type: DataTypes.STRING,
        //     primaryKey: false,
        //     references: {
        //         model: PermissionModel,
        //         key: "name",
        //     },
        // },
    },
    {
        sequelize: db,
        tableName: "Permission",
        hooks: {}
    }
)
// PermissionModel.sync()