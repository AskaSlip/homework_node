import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.errors";

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
    const schema = Joi.object({
      name: Joi.string().min(2).alphanum().required().messages({
        "string.base": "Name should be a type of text.",
        "string.empty": "Name cannot be empty.",
        "string.min": "Name should have a minimum length of 2.",
        "string.alphanum": "Name should only contain alphanumeric characters.",
        "any.required": "Name is a required field.",
      }),

      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(6)
        .required()
        .messages({
          "string.pattern.base":
            "Password must only contain alphanumeric characters.",
          "string.min":
            "Password should have a minimum length of 6 characters.",
          "any.required": "Password is a required field.",
        }),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.email": "Please provide a valid email address.",
          "any.required": "Email is a required field.",
        }),

      age: Joi.number().min(1).max(116).integer().messages({
        "number.base": "Age must be a number.",
        "number.min": "Age must be at least 1.",
        "number.max": "Age must be less than or equal to 116.",
        "number.integer": "Age must be an integer.",
      }),

      phone: Joi.string().allow("+").min(9).max(13),

      role: Joi.string(),

      isVerified: Joi.boolean(),

      isDeleted: Joi.boolean(),
    });
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
