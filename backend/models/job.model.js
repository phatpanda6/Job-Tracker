import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    applicationStatus: {
      type: String,
      default: "Applied",
      enum: ["Applied", "Interviewing", "Rejected", "Offer"],
    },
    applicationDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job; 