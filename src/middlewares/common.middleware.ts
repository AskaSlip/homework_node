import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.errors";
import { schema } from "../services/user.validator";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Invalid id", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(
        new ApiError(
          error.details.map((detail) => detail.message).toString(),
          400,
        ),
      );
    }
    next();
  }
}

export const commonMiddleware = new CommonMiddleware();
