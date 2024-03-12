import { body } from "express-validator";
import validateRequest from "../middlewares/validateRequest";

const login: any = [
  [
    body("email").notEmpty().withMessage("email is required"),
    body("password").notEmpty().withMessage("password is required"),
  ],
  validateRequest,
];
const register: any = [
  [
    body("firstName").notEmpty().withMessage("firstName is required"),
    body("lastName").notEmpty().withMessage("lastName is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("phone").notEmpty().withMessage("phone is required"),
    body("password").notEmpty().withMessage("password is required"),
    body("role").notEmpty().withMessage("role is required"),
  ],
  validateRequest,
];

const userValidator = {
  login,
  register,
};

export default userValidator;
