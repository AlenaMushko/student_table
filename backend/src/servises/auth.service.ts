import { EActionActivatedTokenTypes, EEmailAction } from "../enums";
import { ApiError } from "../errors";
import { tokenRepository, userRepository } from "../repositories";
import { IJwt, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async login(user: IUser): Promise<IJwt> {
    try {
      const tokensPair = tokenService.generateTokenPairs({
        userId: user._id,
        name: user.name,
      });

      Promise.all([
        await tokenRepository.createToken({ ...tokensPair, _userId: user._id }),
        await userRepository.updateByIdPatch(user._id, {
          lastLogin: new Date(),
        }),
      ]);

      return tokensPair;
    } catch (err) {
      new ApiError(err.message, err.status);
    }
  }

  public async activatedToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateVerifyToken(
        user.email,
        EActionActivatedTokenTypes.Activated,
      );
      await tokenRepository.actionToken(
        user,
        actionToken,
        EActionActivatedTokenTypes.Activated,
      );

      await emailService.emailToManager(
        user.email,
        EEmailAction.MANAGER_EMAIL,
        {
          name: user.name + ", " || " ",
          actionToken,
        },
      );
    } catch (err) {
      new ApiError(err.message, err.status);
    }
  }

  public async createPassword(
    email: string,
    password: string,
    tokenId: ITokenPayload,
  ): Promise<void> {
    try {
      const user = await userRepository.findOne(email);
      const hashadPassword = await passwordService.hash(password);

      await userRepository.createPassword(user._id, hashadPassword);
      await tokenRepository.deleteActionToken(tokenId);
    } catch (err) {
      new ApiError(err.message, err.status);
    }
  }

  public async forgotPassword(dto: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateVerifyToken(
        dto.email,
        EActionActivatedTokenTypes.ForgotPassword,
      );

      Promise.all([
        tokenRepository.actionToken(
          dto,
          actionToken,
          EActionActivatedTokenTypes.ForgotPassword,
        ),

        emailService.forgotPassword(dto.email, EEmailAction.FORGOT_PASSWORD, {
          name: dto.name + ", " || " ",
          actionToken,
        }),
      ]);
    } catch (err) {
      new ApiError(err.message, err.status);
    }
  }
}

export const authService = new AuthService();
