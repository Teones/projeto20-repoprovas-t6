import { Router } from "express";

import * as middlewares from "../middlewares/testMiddlewares";
import * as controllers from "../controllers/testController"

const testRouter = Router();
testRouter.post("/tests", middlewares.validateTest, controllers.create);
testRouter.get("/tests/:typeFilter", controllers.filterType);

export default testRouter;