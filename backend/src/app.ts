import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { authRouter, roleRouter, userRouter } from "./routers";
import { initializeAdmin } from "./utils/createAdmin";
import swaggerJson from "./utils/swagger.json";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const PORT = configs.PORT || 3000;

app.use("/auth", authRouter);
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err?.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(PORT, async () => {
  try {
    if (typeof configs.DB_URI === "string") {
      await mongoose.connect(configs.DB_URI);
      await initializeAdmin();
    } else {
      console.error("DB_URI is not defined!");
      process.exit(1);
    }
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("An error occurred while starting the server:", error);
  }
});
