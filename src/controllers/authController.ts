import { NextType, RequestType, ResponseType } from "../types/types";
import { NextFunction, Request, Response } from "express";
import userResource from "../resourses/userResource";
import ErrorResponse from "../utils/ErrorResponse";
import AuthService from "../services/AuthService";
import logger, { logNames } from "../utils/logger";

// const authService = new AuthService();
const authService = new AuthService();

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
export const RegisterUser = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  const data = userResource.register(req.body);
  try {
    await authService.create(data);

    await logger({ req, logName: logNames.registerUser, httpMethod: "POST", status: "Success" })
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error: any) {
    await logger({ req, logName: logNames.registerUser, httpMethod: "POST", status: "Error", message: error.message })
    return next(error);
  }
};

// @desc    Login User
// @route   POST /api/v1/auth/register
// @access  Public
export const loginUser = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(
      new ErrorResponse("Email and password are required to login", 400)
    );
  try {
    const loginData = await authService.login({ email, password });

    req.auth = loginData.user
    await logger({ req, logName: logNames.loginUser, httpMethod: "POST", status: "Success" })
    return res.status(200).json({
      success: true,
      ...loginData,
      message: "Log-in successful",
    });
  } catch (error: any) {

    await logger({ req, logName: logNames.loginUser, httpMethod: "POST", status: "Error", message: error.message })
    return next(error);
  }
};

// @desc    Get Logged in User(Me)
// @route   GET /api/v1/auth/get-me
// @access  Private
export const getMe = async (
  req: RequestType,
  res: ResponseType,
  next: NextType
) => {

  try {
    await logger({ req, logName: logNames.verifyUser, httpMethod: "GET", status: "Success" })
    return res
      .status(200)
      .json({ success: true, message: "User found", data: req?.auth })
  } catch (error: any) {
    await logger({ req, logName: logNames.verifyUser, httpMethod: "GET", status: "Error", message: error.message })
    return next(error);
  }

};
