import type { Request, Response } from "express";
import { Router } from "express";
import { PrismaClient, RideStatus } from '@prisma/client';
import { cancelRide, completeRide, createRide, getUserRides } from "../controllers/rideController.ts";
import { ortentikate } from "../middleware/auth.ts";
import { authorizeRoles } from "../middleware/roleMiddleware.ts";
import { requestToJoinRide, respondToRideRequest, getRideRequestsForDriver, cancelRideRequest } from "../controllers/rideRequestController.ts";

const prisma = new PrismaClient();
const router = Router();

router.get("/routes", async (req: Request, res: Response) => {
  try {
    const rides = await prisma.ride.findMany({
      where: { status: RideStatus.SCHEDULED },
      include: {
        driver: { select: { name: true } },
        rideRequests: {
          include: { passenger: { select: { name: true } } }
        }
      }
    });

    const formatted = rides.map((ride) => ({
      id: ride.id,
      driverName: ride.driver?.name ?? 'Unassigned',
      passengerName: ride.rideRequests.map((r) => r.passenger.name),
      from: ride.origin,
      to: ride.destination,
      departureTime: ride.departureTime,
      price: ride.price
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ride routes", error });
  }
});

router.patch('/complete/:rideId', ortentikate, authorizeRoles('DRIVER'), completeRide)
router.post('/request', ortentikate, authorizeRoles('PASSENGER'), createRide);
router.get('/my-rides', ortentikate, getUserRides)
router.get('/admin-dashboard', ortentikate, authorizeRoles('ADMIN'), getUserRides);
router.post('/rides/:rideId/request', ortentikate, authorizeRoles('PASSENGER'), requestToJoinRide);
router.patch('/ride-requests/:requestId/respond', ortentikate, authorizeRoles('DRIVER'), respondToRideRequest);
router.get('/driver/ride-requests', ortentikate, authorizeRoles('DRIVER'), getRideRequestsForDriver);
router.patch('/:rideId/cancel', ortentikate, authorizeRoles('DRIVER', 'ADMIN'), cancelRide);
router.patch('/ride-requests/:requestId/cancel', ortentikate, authorizeRoles('PASSENGER'), cancelRideRequest);

export default router;
