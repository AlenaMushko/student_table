import { FilterQuery } from "mongoose";

import { ApiError } from "../errors";
import { Role } from "../models";
import { IRole } from "../types";

class RoleRepository {
  public async create(dto: IRole): Promise<IRole> {
    try {
      return await Role.create({ ...dto });
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async getOneByParams(params: FilterQuery<IRole>): Promise<IRole> {
    try {
      return await Role.findOne(params);
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async findAll(): Promise<IRole[]> {
    try {
      return await Role.find();
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }
}
export const roleRepository = new RoleRepository();
