import type { Request, Response } from "express";
import { Router } from "express";
import { completeRide } from '../controllers/rideController.ts';
import { authorizeRoles } from "../middleware/roleMiddleware.ts";
import { ortentikate } from "../middleware/auth.ts";
import { createRide } from "../controllers/rideController.ts";
import { getUserRides } from "../controllers/rideController.ts";

interface Ride {
  id: number;
  driverName: string;
  from: string;
  to: string;
  departureTime: string;
  // returnTime: string;
  price: string;
}

const rideData: Ride[] = [
  { id: 1, driverName: "Kelvin Ifeanyi", from: "Ikeja", to: "Victoria Island", departureTime: "8:00 AM", price: "₦3000" },
  { id: 2, driverName: "Youdon Meanit", from: "Lekki", to: "Yaba", departureTime: "9:00 AM", price: "₦3500" },
  { id: 3, driverName: "Dontbe Stewpeed", from: "Surulere", to: "Ikeja", departureTime: "7:30 AM", price: "₦2500" },
];

const router = Router();

router.get("/routes", (req: Request, res: Response) => {
  res.json(rideData);
});

router.patch('/complete/:rideId', ortentikate, authorizeRoles('DRIVER'), completeRide)
router.post('/request', ortentikate, authorizeRoles('PASSENGER'), createRide);
router.get('/my-rides', ortentikate, getUserRides)
router.get('/admin-dashboard', ortentikate, authorizeRoles('ADMIN'), getUserRides);

export default router;
