import Joi from "joi";

import { regexConstant } from "../constants/regex.constants";

export class UserValidator {
  private static name = Joi.string().trim().min(3).alphanum().messages({
    "string.base": "Name should be a type of text.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should have a minimum length of 3.",
    "string.alphanum": "Name should only contain alphanumeric characters.",
    "any.required": "Name is a required field.",
  });

  private static password = Joi.string()
    .regex(regexConstant.PASSWORD)
    .trim()
    .messages({
      "string.min": "Password should have a minimum length of 6 characters.",
      "any.required": "Password is a required field.",
    });

  private static email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .trim()
    .regex(regexConstant.EMAIL)
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is a required field.",
    });

  private static age = Joi.number().min(18).max(116).integer().messages({
    "number.base": "Age must be a number.",
    "number.min": "Age must be at least 18.",
    "number.max": "Age must be less than or equal to 116.",
    "number.integer": "Age must be an integer.",
  });

  private static phone = Joi.string().trim().regex(regexConstant.PHONE);

  public static create = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    phone: this.phone,
    password: this.password.required(),
    email: this.email.required(),
  });

  public static update = Joi.object({
    name: this.name.required(),
    age: this.age.required(),
    phone: this.phone,
  });
  public static signIn = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  public static changePassword = Joi.object({
    oldPassword: this.password.required(),
    password: this.password.required(),
  });
}
