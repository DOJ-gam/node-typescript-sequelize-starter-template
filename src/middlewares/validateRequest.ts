import { NextFunction, Request, Response } from "express";

const { validationResult } = require("express-validator");

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  // console.log("Request Validation Error");
  if (errors.isEmpty()) return next();
  const message = errors.errors.map((err: any) => err.msg);
  return res.status(400).json({ success: false, message: message.toString() });
};

export default validateRequest;
