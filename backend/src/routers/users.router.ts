import { Router } from "express";

import { userController } from "../controller";
import { ERoles } from "../enums";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
} from "../middelware";
import { userSchema } from "../validations";

const router = Router();
router.use(authenticateMiddleware.isLogin);
router.use(  authMiddleware.isMyRole(ERoles.ADMIN))

router.post(
  "/",
  commonMiddleware.isBodyValid(userSchema.create),
  userController.create,
);

router.get("/", userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.findByIdByThrow,
  userController.findById,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(userSchema.updateUserSchema),
  authMiddleware.findByIdByThrow,
  userController.updateById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.findByIdByThrow,
  userController.deleteById,
);

export const userRouter = router;
