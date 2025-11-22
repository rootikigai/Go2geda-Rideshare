import type { Request, Response } from "express";
import { Router } from "express";
import { PrismaClient, RideStatus } from "@prisma/client";
import { cancelRide, completeRide, createRide, getUserRides } from "../controllers/rideController.ts";
import { authenticate } from "../middleware/auth.ts";
import { authorizeRoles } from "../middleware/roleMiddleware.ts";
import { requestToJoinRide, respondToRideRequest, getRideRequestsForDriver, cancelRideRequest } from "../controllers/rideRequestController.ts";
import { getUserNotifications, markNotificationAsRead } from "../controllers/notificationController.ts";

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
      passengers: ride.rideRequests.map((r) => r.passenger.name),
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

router.patch('/complete/:rideId', authenticate, authorizeRoles('DRIVER'), completeRide)
router.post('/create-ride', authenticate, authorizeRoles('DRIVER'), createRide);
router.get('/my-rides', authenticate, getUserRides)
router.get('/admin-dashboard', authenticate, authorizeRoles('ADMIN'), getUserRides);
router.post('/:rideId/request', authenticate, authorizeRoles('PASSENGER'), requestToJoinRide);
router.patch('/ride-requests/:requestId/respond', authenticate, authorizeRoles('DRIVER'), respondToRideRequest);
router.get('/driver/ride-requests', authenticate, authorizeRoles('DRIVER'), getRideRequestsForDriver);
router.patch('/:rideId/cancel', authenticate, authorizeRoles('DRIVER', 'ADMIN'), cancelRide);
router.patch('/ride-requests/:requestId/cancel', authenticate, authorizeRoles('PASSENGER'), cancelRideRequest);
router.get('/notifications', authenticate, getUserNotifications);
router.patch('/notifications/:notificationId/read', authenticate, markNotificationAsRead);


export default router;
