import { Model, DataTypes } from "sequelize";
import jwt from "jsonwebtoken";
import hasHelper from "../utils/hashHelper";
import db from "../config/db";
import ErrorResponse from "../utils/ErrorResponse";
import RoleModel from "./Role";

export interface UserModelAttributes {
    id: number | null;
    firstName: string;
    middleName?: string;
    lastName: string;
    fullName?: string;
    email: string;
    phone: string;
    password?: string;
    roleId: number | null;
    status: "active" | "inactive";

}
class UserModel extends Model<UserModelAttributes> {
    public id!: number | null;
    public firstName!: string;
    public middleName!: string;
    public lastName!: string;
    public fullName!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public roleId!: number | null;
    public status!: "active" | "inactive";

    public matchPassword!: (enteredPassword: string) => Promise<boolean>;
    public getSignedJwtToken!: () => string;
}

UserModel.init(
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this?.middleName ?? ""} ${this.lastName}`
            },
            set(val) {
                throw new ErrorResponse("You cannot create fullName", 400)
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: { msg: "Invalid email address" },
                notNull: { msg: "Email is required" },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        status: {
            type: DataTypes.ENUM,
            values: ["active", "inactive"],
            defaultValue: "inactive",
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "User",
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const hashedPassword = await hasHelper.bcryptHash(user.password);
                    if (!hashedPassword) throw new ErrorResponse("Error hashing your password, Please try again", 500)
                    user.password = hashedPassword;
                }
            },
            beforeUpdate: async (user) => {
                // if password is changed, hash again
                if (user.changed("password")) {
                    const password = user.getDataValue('password')
                    const hashedPassword = await hasHelper.bcryptHash(password as string);
                    if (!hashedPassword) throw new ErrorResponse("Error hashing your password, Please try again", 500)
                    user.password = hashedPassword;
                }
            }
        },
    }
);

UserModel.prototype.matchPassword = async function (enteredPassword: string) {
    return await hasHelper.bcryptCompareHash(enteredPassword, this.password);
};

UserModel.prototype.getSignedJwtToken = function () {
    const user = this;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
        expiresIn: process.env.JWT_EXPIRES || "1h",
    });
    return token;
};

// UserModel.sync();

export default UserModel;