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

router.post(
  "/",
  commonMiddleware.isBodyValid(userSchema.create),
  authMiddleware.isMyRole(ERoles.ADMIN),
  userController.create,
);
//
// router.post(
//     "/emailToManager",
//     authenticateMiddleware.isLogin,
//     commonMiddleware.isBodyValid(emailSchema.create),
//     userController.emailToManager,
// );
//
// router.post(
//     "/emailToAdmin",
//     authenticateMiddleware.isLogin,
//     commonMiddleware.isBodyValid(emailSchema.create),
//     userController.emailToAdmin,
// );
//
// router.post(
//     "/buyPremium",
//     authenticateMiddleware.isLogin,
//     commonMiddleware.isBodyValid(emailSchema.create),
//     userController.buyPremium,
// );
//
// router.post(
//     "/:userId/avatar",
//     commonMiddleware.isIdValid("userId"),
//     fileMiddleware.isAvatarValid,
//     userController.uploadAvatar,
// );
//
// router.get(
//     "/:userId",
//     commonMiddleware.isIdValid("userId"),
//     userMiddleware.findByIdByThrow,
//     userController.findById,
// );
//
// router.put(
//     "/:userId",
//     commonMiddleware.isIdValid("userId"),
//     commonMiddleware.isBodyValid(userSchema.updateUserSchema),
//     userMiddleware.findByIdByThrow,
//     userController.updateById,
// );
//
// router.delete(
//     "/:userId",
//     authMiddleware.isMyRole(ERoles.Admin),
//     commonMiddleware.isIdValid("userId"),
//     userMiddleware.findByIdByThrow,
//     userController.deleteById,
// );

export const userRouter = router;