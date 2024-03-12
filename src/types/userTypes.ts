import { UserModelAttributes } from "../models/User";

export type RegisterUserType = Omit<UserModelAttributes, "id"> & {
    role: string | null
};
export type LoginUserType = {
    email: string,
    password: string
};
