import express from "express";
import {
  getJobs,
  createJob,
  updateJob,
  deleteProduct,
} from "../controllers/job.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// rather than passing protect every time, i think you can just do
// router.use(protect)

// then the route setup just becomes
// router.route("/").get(getJobs).post(createJob)

// router.route("/:id").put(updateJob).delete(deleteProduct)

router.route("/").get(protect, getJobs).post(protect, createJob);

router.route("/:id").put(protect, updateJob).delete(protect, deleteProduct);

export default router;
