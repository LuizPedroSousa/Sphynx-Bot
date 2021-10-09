import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "@exceptions/HttpException";

const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" = "body",
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const errors: any = await validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    });

    if (errors.length > 0) {
      const fields = errors
        .map((error: ValidationError) =>
          Object.values(error.constraints as any)
        )
        .join(", ");
      next(
        new HttpException({
          status: 400,
          message: "Invalid Data",
          fields,
        })
      );
    } else {
      next();
    }
  };
};

export default validationMiddleware;
