import mongoose from "mongoose";
import Job from "../models/job.modal.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.log("error in fetching jobs:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createJob = async (req, res) => {
  try {
    // this type of validation is a good candidate for middleware
    // or a separate utility
    const jobData = req.body;
    if (!jobData.companyName || !jobData.title || !jobData.applicationDate) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all required fields" });
    }
    const newJob = new Job({
      ...jobData,
      user: req.user._id,
    });
    await newJob.save();
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error("Error in Create job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const jobData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Job Id" });
  }

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Security Check: Ensure the job belongs to the logged-in user
    // another candidate for middleware here. 
    // basically any time i duplicate code across multiple routes,
    // i think about refactoring to middleware
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true });
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- THIS FUNCTION IS UPDATED FOR SECURITY ---
// why deleteProduct and not deleteJob?
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Job Id" });
  }

  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Security Check: Ensure the job belongs to the logged-in user
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }
    
    await Job.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.log("error in deleting job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};