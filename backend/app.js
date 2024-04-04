import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import {dbConnection} from "./database/db.js";
import ErrorHandler from "./middlewares/error.js"
const app = express();
config({ path: "./config/.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    Credential: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("./api/user", userRouter);
app.use("./api/job", jobRouter);
app.use("./api/application", applicationRouter);

dbConnection();
app.use(ErrorHandler);
export default app;
