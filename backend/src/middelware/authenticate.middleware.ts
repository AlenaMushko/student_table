import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { configs } from "../config";
import { ApiError } from "../errors";
import { tokenRepository, userRepository } from "../repositories";

const tokenSecret = configs.ACCESS_TOKEN_SECRET;

class AuthenticateMiddleware {
  public async isUserActive(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await userRepository.findOne(email);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      if (!user.isActive) {
        throw new ApiError("User is not active", 403);
      }
      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  public async isLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new ApiError("Authorization header missing", 401);
      }

      const [bearer, token] = authorization.split(" ");
      if (!bearer || !token) {
        throw new ApiError("Not authorized", 401);
      }
      const { userId } = jwt.verify(token, tokenSecret) as JwtPayload;
      const user = await userRepository.findById(userId);
      const tokenModel = await tokenRepository.getByID(userId);

      if (!user || !tokenModel) {
        throw new ApiError("Token not valid", 401);
      }

      res.locals.user = user;
      res.locals.tokenModel = tokenModel;

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authenticateMiddleware = new AuthenticateMiddleware();
