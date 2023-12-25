import { ApiError } from "../errors";
import { Activated, Token } from "../models";
import { IActivated, IToken, ITokenPayload, IUser } from "../types";

class TokenRepository {
  public async createToken(body: Partial<IToken>): Promise<IToken> {
    try {
      return await Token.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getByID(userId: ITokenPayload): Promise<IToken> {
    try {
      return await Token.findOne({ _userId: userId });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async logout(_id: ITokenPayload): Promise<void> {
    try {
      await Token.deleteOne({ _id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findOne(token: string): Promise<IToken> {
    try {
      return await Token.findOne({ accessToken: token });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async findActivatedToken(token: string): Promise<IActivated> {
    try {
      return await Activated.findOne({ accessToken: token });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async actionToken(
    body: IUser,
    actionToken: string,
    tokenType: string,
  ): Promise<IActivated> {
    try {
      return (await Activated.create({
        accessToken: actionToken,
        userEmail: body.email,
        tokenType,
      })) as unknown as IActivated;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteActionToken(_id: ITokenPayload): Promise<void> {
    try {
      await Activated.deleteOne({ _id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const tokenRepository = new TokenRepository();
