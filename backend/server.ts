import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes.ts";
import userRoutes from "./routes/userRoutes.ts";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/rides", rideRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Go2geda");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
