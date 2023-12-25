import { ApiError } from "../errors";
import { roleRepository, userRepository } from "../repositories";
import { IUser } from "../types";

class UserService {
  public async create(dto: IUser): Promise<IUser> {
    try {
      const { _id } = await roleRepository.getOneByParams({
        name: dto._roleId,
      });

      return await userRepository.create(dto, _id.toString());
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getAll(): Promise<IUser[]> {
    try {
      return await userRepository.findAll();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(
    userId: string,
    user: IUser,
    value: Partial<IUser>,
  ): Promise<IUser> {
    try {
      const { _id } = await roleRepository.getOneByParams({
        name: value._roleId,
      });
      const _roleId: string = _id.toString();
      const lastVisited = new Date();
      const updatedValue = {
        ...value,
        _roleId,
        lastVisited,
        updatedAt: new Date(),
      };
      const updatedUser = Object.assign(user, updatedValue);

      return await userRepository.updateById(userId, updatedUser);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(userId: string): Promise<void> {
    try {
      await userRepository.deleteById(userId);
      return;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
