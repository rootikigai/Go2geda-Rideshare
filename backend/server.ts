import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/rides", rideRoutes);
app.use("/api/users", userRoutes);

// Health check / test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Go2geda");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
