import { NextFunction, Request, Response } from "express";
import { UserModelAttributes } from "../models/User";

export type RequestType = Request & {
  auth?: UserModelAttributes;
  queryParams?: any

};
export type ResponseType = Response;
export type NextType = NextFunction;
