import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
const errorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  if no errors
  if (!err) return next();

  // initialize
  let error: any = await { ...err };
  error.name = err.name;
  error.message = err.message;

  // log if in development mode
  if (process.env.NODE_ENV === "development") {
    console.log("Error Object:", err);
    console.log("Errors:", err.errors);
    console.log(`Error Name: ${err.name}`);
    console.log(`${err}`);
  }
  // Validation errors
  if (error.name === "SequelizeValidationError") {
    const message = error.errors.map((er: Error) => er.message);
    error = new ErrorResponse(message, 400);
  }

  // Duplicate field validation
  if (error.name === "SequelizeUniqueConstraintError") {
    const message = "Already exists, " + error.errors[0].message;
    error = new ErrorResponse(message, 400);
  }

  // error response
  return res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || error });
};

export default errorHandler;
