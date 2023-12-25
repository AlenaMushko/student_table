import { NextFunction, Request, Response } from "express";

import { roleService } from "../servises";
import { IRole } from "../types";

class RoleController {
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole>> {
    try {
      const newRole = await roleService.create(req.body);

      return res
        .status(201)
        .json({ message: "User is created", data: newRole });
    } catch (error) {
      next(error);
    }
  }

  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole[]>> {
    try {
      const roles = await roleService.findAll();

      return res.status(200).json({ data: roles });
    } catch (e) {
      next(e);
    }
  }

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IRole>> {
    try {
      const role = await roleService.findById(res.locals.id);

      return res.status(200).json({ data: role });
    } catch (error) {
      next(error);
    }
  }
}

export const roleController = new RoleController();
