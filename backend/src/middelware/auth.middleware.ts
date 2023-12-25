import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

import { ApiError } from "../errors";
import { Role } from "../models";
import { tokenRepository, userRepository } from "../repositories";
import { passwordService } from "../servises";

class AuthMiddleware {
  public async loginError(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userRepository.findOne(req.body.email);

      if (!user) {
        throw new ApiError("Invalid email or password", 401);
      }

      const isMatched = await passwordService.compare(
        req.body.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      res.locals.user = user;

      next();
    } catch (e) {
      next(e);
    }
  }

  public isMyRole(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { _roleId } = res.locals.user;
        const userRole = await Role.findById(_roleId);
        if (role !== userRole.name) {
          throw new ApiError("You role do not have access", 403);
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  public async isUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const userEmail = req.body.email || res.locals.userEmail;
      const user = await userRepository.findOne(userEmail);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const user = await userRepository.findById({ _id: new ObjectId(userId) });
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isTokenValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { activatedToken } = req.params;
      const token = await tokenRepository.findActivatedToken(activatedToken);
      if (!token) {
        throw new ApiError("Token not found", 404);
      }

      res.locals.userEmail = token.userEmail;
      res.locals.tokenId = token._id;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isPassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.password !== req.body.repeatPassword) {
        throw new ApiError("Password not match", 400);
      }

      res.locals.userPassword = req.body.password;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
