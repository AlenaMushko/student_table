import { ApiError } from "../errors";
import { User } from "../models";
import { ITokenPayload, IUser } from "../types";

class UserRepository {
  public async create(dto: IUser, _roleId: string): Promise<IUser> {
    try {
      return await User.create({ ...dto, _roleId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findAll(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findById(userId: ITokenPayload): Promise<IUser> {
    try {
      return await User.findById(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findOne(email: string): Promise<IUser> {
    try {
      return (await User.findOne({ email })) as unknown as IUser;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateById(userId: string, value: IUser): Promise<IUser> {
    try {
      return await User.findByIdAndUpdate(userId, { ...value }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async updateByIdPatch(
    userId: string,
    value: Partial<IUser>,
  ): Promise<IUser> {
    try {
      return await User.findByIdAndUpdate(userId, { ...value }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteById(userId: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userId });
      return;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async createPassword(
    userId: string,
    password: string,
  ): Promise<IUser> {
    try {
      return await User.findByIdAndUpdate(userId, { password }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userRepository = new UserRepository();
