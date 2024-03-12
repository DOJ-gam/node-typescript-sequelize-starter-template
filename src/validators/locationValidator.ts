import { body } from "express-validator";
import validateRequest from "../middlewares/validateRequest";

const register: any = [
    [
        body("name").notEmpty().withMessage("name is required"),
        body("address").notEmpty().withMessage("address is required"),
    ],
    validateRequest,
];

const locationValidator = {
    register,
};

export default locationValidator;
