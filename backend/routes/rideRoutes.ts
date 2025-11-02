import { Router } from "express";
import type { Request, Response } from "express";

// Ride interface for TypeScript
interface Ride {
  id: number;
  driverName: string;
  from: string;
  to: string;
  departureTime: string;
  price: string;
}

// In-memory ride data
const rideData: Ride[] = [
  { id: 1, driverName: "Kelvin Ifeanyi", from: "Ikeja", to: "Victoria Island", departureTime: "8:00 AM", price: "₦3000" },
  { id: 2, driverName: "Youdon Meanit", from: "Lekki", to: "Yaba", departureTime: "9:00 AM", price: "₦3500" },
  { id: 3, driverName: "Dontbe Stewpeed", from: "Surulere", to: "Ikeja", departureTime: "7:30 AM", price: "₦2500" },
];

const router = Router();

// GET /api/rides/routes
router.get("/routes", (req: Request, res: Response) => {
  res.json(rideData);
});

export default router;
