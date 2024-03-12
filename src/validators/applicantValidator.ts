import { body } from "express-validator";
import validateRequest from "../middlewares/validateRequest";

const validateTitle = (value: string) => {
    const validTitles = ['mr', 'mrs', 'miss', 'ms'];
    return validTitles.includes(value);
};
const validateGender = (value: string) => {
    const validGender = ['male', 'female'];
    return validGender.includes(value);
};
const validateYesNo = (value: string) => {
    const validYesNo = ['yes', 'no'];
    return validYesNo.includes(value);
};

const register: any = [
    [
        body("nin").notEmpty().withMessage("nin is required"),
        body("title").notEmpty().withMessage("title is required"),
        body("phone").notEmpty().withMessage("phone is required"),
        // body('title').custom((value) => {
        //     if (!validateTitle(value)) {
        //         throw new Error('Title must be one of: mr, mrs, miss, or ms');
        //     }
        // }),
        body("firstName").notEmpty().withMessage("firstName is required"),
        body("lastName").notEmpty().withMessage("lastName is required"),
        body("initials").notEmpty().withMessage("initials is required"),
        body("dob").notEmpty().withMessage("dob is required"),
        body("gender").notEmpty().withMessage("gender is required"),
        // body('gender').custom((value) => {
        //     if (!validateGender(value)) {
        //         throw new Error('Gender must be one of: male, female');
        //     }
        // }),
        body("placeOfBirth").notEmpty().withMessage("placeOfBirth is required"),
        body("blackouts").notEmpty().withMessage("blackouts is required"),
        // body('blackouts').custom((value) => {
        //     if (!validateYesNo(value)) {
        //         throw new Error('Blackouts must be one of: yes, no');
        //     }
        // }),
        body("epilepsy").notEmpty().withMessage("epilepsy is required"),
        // body('epilepsy').custom((value) => {
        //     if (!validateYesNo(value)) {
        //         throw new Error('Blackouts must be one of: yes, no');
        //     }
        // }),
        body("glaucomaOrCataractOrEyeDisease").notEmpty().withMessage("glaucomaOrCataractOrEyeDisease is required"),
        // body('glaucomaOrCataractOrEyeDisease').custom((value) => {
        //     if (!validateYesNo(value)) {
        //         throw new Error('glaucomaOrCataractOrEyeDisease must be one of: yes, no');
        //     }
        // }),
        body("seizuresOrLossOfConsciousness").notEmpty().withMessage("seizuresOrLossOfConsciousness is required"),
        // body('seizuresOrLossOfConsciousness').custom((value) => {
        //     if (!validateYesNo(value)) {
        //         throw new Error('seizuresOrLossOfConsciousness must be one of: yes, no');
        //     }
        // }),
        body("otherMedicalIssues").notEmpty().withMessage("otherMedicalIssues is required"),
        body("mailingAddress").notEmpty().withMessage("mailingAddress is required"),
        body("permanentAddress").notEmpty().withMessage("permanentAddress is required"),
        body("occupation").notEmpty().withMessage("occupation is required"),
        body("fathersFullName").notEmpty().withMessage("fathersFullName is required"),
        body("fathersPlaceOfBirth").notEmpty().withMessage("fathersPlaceOfBirth is required"),
        body("mothersFullName").notEmpty().withMessage("mothersFullName is required"),
        body("mothersPlaceOfBirth").notEmpty().withMessage("mothersPlaceOfBirth is required"),
        body("nextOfKinFullName").notEmpty().withMessage("nextOfKinFullName is required"),
        body("nextOfKinAddress").notEmpty().withMessage("nextOfKinAddress is required"),
    ],
    validateRequest,
];


export default {
    register
}