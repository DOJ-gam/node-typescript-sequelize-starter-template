import { DataTypes, Model } from "sequelize";
import db from "../config/db";

export interface RoleModelAttributes {
    id: number | null,
    name: string,
    description: string,
}

export default class RoleModel extends Model<RoleModelAttributes> {
    id!: number | null;
    name!: string;
    description!: string;
}

RoleModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: "Role",
    hooks: {}
})
// RoleModel.sync()