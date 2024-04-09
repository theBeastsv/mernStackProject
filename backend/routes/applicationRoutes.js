import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationControllers.js";
import { isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isauthorized, postApplication);
router.get("/employer/getall", isauthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isauthorized, jobseekerGetAllApplications);
router.delete("/delete/:id", isauthorized, jobseekerDeleteApplication);

export default router;
