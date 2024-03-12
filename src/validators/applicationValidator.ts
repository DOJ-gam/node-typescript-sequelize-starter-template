import { body, ValidationChain } from "express-validator";
import validateRequest from "../middlewares/validateRequest";

// const applicantValidator: ValidationChain[] = [
const register: any = [
  [
    // body('applicationId').notEmpty().withMessage('applicationId is required'),
  ],
  validateRequest,
];
const createPayment: any = [
  [
    body("phone").notEmpty().withMessage("phone is required"),
    body("title")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("title is required"),
    body("firstName")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("firstName is required"),
    body("lastName")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("lastName is required"),
    body("dob")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("dob is required"),
    // body('email').if(body('iAmApplyingFor').equals('newApplicant')).notEmpty().withMessage('email is required'),
    body("birthNationality")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("birthNationality is required"),
    body("nationality")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("nationality is required"),
    body("documentRequested")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("documentRequested is required"),
    body("iAmApplyingFor")
      .if(body("iAmApplyingFor").equals("newApplicant"))
      .notEmpty()
      .withMessage("iAmApplyingFor is required"),
    // body('documentPrice').notEmpty().withMessage('documentPrice is required'),
    // body('formPrice').notEmpty().withMessage('formPrice is required'),
  ],
  validateRequest,
];

export default { register, createPayment };
