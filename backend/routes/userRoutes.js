import express from "express";
import { register, login, logout } from "../controllers/userControllers.js";
import { isauthorized } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isauthorized, logout);

export default router;
