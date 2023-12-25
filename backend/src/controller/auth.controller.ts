import { NextFunction, Request, Response } from "express";

import { authService, tokenService } from "../servises";
import { IJwt, IMessage } from "../types";

class AuthController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IJwt>> {
    try {
      const tokenPair = await authService.login(res.locals.user);
      return res.status(200).json({ ...tokenPair });
    } catch (e) {
      next(e);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const token = res.locals.tokenModel;
      await tokenService.logout(token._id);

      return res.status(200).json({ message: "Logout success" });
    } catch (e) {
      next(e);
    }
  }

  public async activatedToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const user = res.locals.user;

      await authService.activatedToken(user);

      return res
        .status(200)
        .json({ message: "Activated token sent to user email" });
    } catch (e) {
      next(e);
    }
  }

  public async createPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const email = res.locals.userEmail;
      const password = res.locals.userPassword;
      const tokenId = res.locals.tokenId;
      await authService.createPassword(email, password, tokenId);

      return res.status(200).json({ message: "Password created successfully" });
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IMessage>> {
    try {
      const user = res.locals.user;
      await authService.forgotPassword(user);

      return res
        .status(200)
        .json({ message: "Send forgot password letter successful" });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
