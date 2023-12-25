import { ApiError } from "../errors";
import { roleRepository } from "../repositories";
import { IRole } from "../types";

class RoleService {
  public async create(dto: IRole): Promise<IRole> {
    try {
      const role = await roleRepository.getOneByParams({ name: dto.name });
      if (role) {
        throw new ApiError("Such a role already exists", 404);
      }

      return await roleRepository.create(dto);
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async findAll(): Promise<IRole[]> {
    try {
      return await roleRepository.findAll();
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }

  public async findById(roleId: string): Promise<IRole> {
    try {
      const role = await roleRepository.getOneByParams({ _id: roleId });
      if (!role) {
        throw new ApiError("Role not found", 404);
      }

      return role;
    } catch (err) {
      throw new ApiError(err.message, err.status);
    }
  }
}

export const roleService = new RoleService();
