import { Router } from "express";

import { roleController } from "../controller";
import { ERoles } from "../enums";
import {
  authenticateMiddleware,
  authMiddleware,
  commonMiddleware,
} from "../middelware";

const router = Router();
router.use(authenticateMiddleware.isLogin);
router.use(authMiddleware.isMyRole(ERoles.ADMIN));

router.post("/", roleController.create);

router.get("/all", roleController.findAll);

router.get(
  "/:routerId",
  commonMiddleware.isIdValid("routerId"),
  roleController.findById,
);

export const roleRouter = router;
