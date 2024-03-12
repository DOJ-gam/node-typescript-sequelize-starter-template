import { body, check } from "express-validator";
import validateRequest from "../middlewares/validateRequest";

const addRole: any = [
    [body("name").notEmpty().withMessage("name is required")],
    [
        body("description")
            .notEmpty()
            .withMessage("description is required"),
    ],

    validateRequest,
];
const addPermission: any = [
    check("data.*.name")
        .not()
        .isEmpty().withMessage("name is required"),

    check("data.*.description")
        .not()
        .isEmpty().withMessage("description is required"),
    validateRequest,
];
const updatePermission: any = [
    check("name")
        .not()
        .isEmpty().withMessage("name is required"),

    check("description")
        .not()
        .isEmpty().withMessage("description is required"),
    validateRequest,
];

const validateAddPermissionsToRole: any = [
    // Check if 'permissions' is an array
    check("roleId").notEmpty().withMessage("roleId is required"),
    check("permissionNames")
        .isArray()
        .withMessage("permissionNames must be an array"),
    validateRequest,
];
const validateUpdatePermissionsToRole: any = [
    // Check if 'permissions' is an array
    check("permissionNames")
        .isArray()
        .withMessage("permissionNames must be an array"),
    validateRequest,
];


export default {
    addRole,
    validateAddPermissionsToRole,
    validateUpdatePermissionsToRole,
    addPermission,
    updatePermission,
}