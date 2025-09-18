import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import jobRoutes from "./routes/job.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; 

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/jobs", jobRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
