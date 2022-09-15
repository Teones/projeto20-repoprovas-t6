import { Router } from "express";

import * as middlewares from "../middlewares/testMiddlewares.js";
import * as controllers from "../controllers/testController.js"

const testRouter = Router();
testRouter.post("/tests", middlewares.validateTest, controllers.create);

export default testRouter;