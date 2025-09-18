import mongoose from "mongoose";
import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.log("error in fetching jobs:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createJob = async (req, res) => {
  const job = req.body; //inputted by user

  if (!job.companyName || !job.title || !job.applicationDate) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newJob = new Job(job);

  try {
    await newJob.save(); //saves the user inputted data into the database
    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    console.error("Error in Create job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Job Id" });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, job, { new: true });
    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Job Id" });
  }

  try {
    await Job.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.log("error in deleting job:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
