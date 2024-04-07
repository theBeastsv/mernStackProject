import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobControllers.js";

import { isauthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isauthorized, postJob);
router.get("/getmyjobs", isauthorized, getMyJobs);
router.put("/update/:id", isauthorized, updateJob);
router.delete("/delete/:id", isauthorized, deleteJob);
router.get("/:id", isauthorized, getSingleJob);

export default router;
