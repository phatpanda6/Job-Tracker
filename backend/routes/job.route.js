import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteProduct,
} from "../controllers/job.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").get(protect, getJobs).post(protect, createJob);

router.route("/:id").put(protect, updateJob).delete(protect, deleteProduct);

export default router;
