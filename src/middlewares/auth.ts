import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";
import { AnyZodObject, z, ZodError } from "zod";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default class Auth {
  static authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization");
      if (!token) throw new Error("No token provided");
      const decoded: any = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error: any) {
      res.status(500).send({ message: `Error authenticating user: ${error.message}` });
    }
  };
}


export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sanitizedValues = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = sanitizedValues.body;
      req.query = sanitizedValues.query;
      req.params = sanitizedValues.params;
      return next();
    } catch (error) {
      console.log(error,"error")
      const validationErrors: { [key: string]: string } = {};

      (error as ZodError).errors.forEach((errorMessage) => {
        const fieldName = errorMessage.path.join(".");
        validationErrors[fieldName] = errorMessage.message;
      });
      console.log(validationErrors,"validationErrors")

      res.status(400).json({ errors: validationErrors });
    }
  };