import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/job.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDB();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- API ROUTES ---
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

app.get('/api', (req, res) => {
  res.status(200).json({ 
    message: 'Job Tracker API is running.',
    environment: process.env.NODE_ENV || 'development'
  });
});

export default app;