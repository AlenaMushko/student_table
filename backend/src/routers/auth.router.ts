import { Router } from "express";

import { authController } from "../controller";
import { ERoles } from "../enums";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
} from "../middelware";
import { userSchema } from "../validations";

const router = Router();

router.post(
  "/login",
  commonMiddleware.isBodyValid(userSchema.login),
  authMiddleware.loginError,
  authenticateMiddleware.isUserActive,
  authController.login,
);

router.delete("/logout", authenticateMiddleware.isLogin, authController.logout);

router.post(
  "/activatedToken/:userId",
  authenticateMiddleware.isLogin,
  authMiddleware.isMyRole(ERoles.ADMIN),
  commonMiddleware.isIdValid("userId"),
  authMiddleware.findByIdByThrow,
  authController.activatedToken,
);

router.post(
  "/createPassword/:activatedToken",
  authMiddleware.isTokenValid,
  commonMiddleware.isBodyValid(userSchema.activated),
  authMiddleware.isPassword,
  authController.createPassword,
);

router.post(
  "/forgotPassword",
  commonMiddleware.isBodyValid(userSchema.forgotPassword),
  authMiddleware.isUserByEmail,
  authController.forgotPassword,
);

export const authRouter = router;
