import express, {json} from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import router from "./routers/index.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);

export default app;