import { Router } from "express";

import * as controllers from "../controllers/authController.js";
import * as middlewares from "../middlewares/authMiddlewares.js"

const authRouter = Router();
authRouter.post("/sign-up", middlewares.validateSignUp, controllers.SignUp);
authRouter.post("/sign-in", middlewares.validateSignIn, controllers.SignIn);

export default authRouter;