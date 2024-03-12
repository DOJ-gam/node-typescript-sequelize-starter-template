import { DataTypes, Model } from "sequelize";
import db from "../config/db";
import UserModel from "./User";

export interface LogsModelAttributes {
    id?: number | null;
    userId?: number | null;
    httpMethod: "GET" | "POST" | "PUT" | "DELETE";
    logName: string
    logDetails: string
    ipAddress: string
    timestamp: string
}

export default class LogsModel extends Model<LogsModelAttributes> {
    public id!: number | null;
    userId!: number | null;
    httpMethod!: "GET" | "POST" | "PUT" | "DELETE";
    logName!: string
    logDetails!: string
    ipAddress!: string
    timestamp!: string

}

LogsModel.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            primaryKey: false,
            references: {
                model: UserModel,
                key: "id",
            },
        },
        httpMethod: {
            type: DataTypes.ENUM,
            values: ["GET", "POST", "PUT", "DELETE"],
            allowNull: false
        },
        logName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logDetails: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: "Logs",
        hooks: {}
    }
);

// LogsModel.sync()