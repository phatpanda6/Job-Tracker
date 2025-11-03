import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import jobRoutes from "./routes/job.route.js";
import userRoutes from "./routes/user.route.js";

// Explicitly configure dotenv to find the .env file in the backend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json()); // allows us to accept JSON data in the req.body

// ROUTES
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// START SERVER
app.listen(PORT, () => {
  connectDB();
  console.log(`server started at http://localhost:${PORT}`);
});
