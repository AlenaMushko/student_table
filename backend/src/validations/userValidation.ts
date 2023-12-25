import Joi from "joi";

import { loginConstants } from "../constants";

export class userSchema {
  static userName = Joi.string().min(3).max(30).messages({
    "string.base": `"username" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });

  static surName = Joi.string().min(3).max(30).messages({
    "string.base": `"surName" should be a type of 'text'`,
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long",
  });

  static email = Joi.string().email().regex(loginConstants.EMAIL).messages({
    "string.email": "{{#label}} must be a valid email",
    "any.required": "{{#label}} is required!!",
    "string.pattern.base":
      "{{#label}} should start with alphanumeric, underscores, dots, or hyphens, followed by '@', then alphanumeric, dots or hyphens, and end with 2 to 4 alphabet characters.",
  });
  static password = Joi.string().min(3).max(20).messages({
    "string.pattern.base": "{{#label}} must be 3 to 20 characters",
    "any.required": "{{#label}} is required!!",
  });
  static _roleId = Joi.string().valid("manager", "admin").messages({
    "any.only": "{{#label}} must be either 'manager', 'admin' ",
  });
  static isActive = Joi.boolean().default(false);
  static lastLogin = Joi.date().optional();

  static page = Joi.number().integer().min(1).max(500).default(1).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static limit = Joi.number().integer().min(1).max(50).default(9).messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static sortedBy = Joi.string().default("name").messages({
    "number.base": "{{#label}} must be a number",
    "string.min": "{{#label}} must be at least {{#limit}} $",
    "string.max": "{{#label}}  must be less than or equal to {{#limit}} $",
  });

  static create = Joi.object({
    name: this.userName.required(),
    surName: this.surName.required(),
    email: this.email.required(),
    password: this.password,
    _roleId: this._roleId,
    isActive: this.isActive,
    lastLogin: this.lastLogin,
  });

  static updateUserSchema = Joi.object({
    name: this.userName.required(),
    surName: this.surName.required(),
    email: this.email.required(),
    password: this.password.required(),
    _roleId: this._roleId,
    isActive: this.isActive,
  }).or("name", "email", "password", "_roleId", "isActive");

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
    lastLogin: this.lastLogin,
  });

  static activated = Joi.object({
    password: this.password.required(),
    repeatPassword: this.password.required(),
  });

  static forgotPassword = Joi.object({
    email: this.email.required(),
  });

  static queryUserSchema = Joi.object({
    page: this.page,
    limit: this.limit,
    sortedBy: this.sortedBy,
  });
}
