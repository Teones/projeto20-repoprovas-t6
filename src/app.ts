import express, {json} from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

export default app;