import type { Request, Response } from "express";
import { PrismaClient, RideRequestStatus } from "@prisma/client";
import { createNotification } from "./notificationController";

const prisma = new PrismaClient();

export const requestToJoinRide = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { rideId } = req.params;

  if (user.role !== 'PASSENGER') {
    return res.status(403).json({ message: "Only passengers can request rides" })
  }

  try {
    const ride = await prisma.ride.findUnique({
      where: { id: parseInt(rideId as string, 10) },
    });

    if (!ride || ride.seatsAvailable <= 0) {
      return res.status(400).json({ message: 'Ride is full or not found' })
    }

    const existingRequest = await prisma.rideRequest.findFirst({
      where: {
        rideId: ride.id,
        passengerId: user.userId,
      },
    });

    if (existingRequest) {
      return res.status(400).json({ message: "You have already requested to join this ride" });
    }

    const rideRequest = await prisma.rideRequest.create({
      data: {
        rideId: parseInt(rideId as string, 10),
        passengerId: user.userId,
        status: RideRequestStatus.PENDING,
      },
    });

    await createNotification(
      ride.driverId!,
      `Passenger ${user.name} has requested to join your ride from ${ride.origin} to ${ride.destination}.`,
      'REQUEST'
    )

    res.status(201).json({ message: "Ride request sent!", rideRequest })
  } catch (error) {
    res.status(500).json({ message: "Error requesting ride", error })
  }
}

export const respondToRideRequest = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { requestId } = req.params;
  const { decision } = req.body;

  if (user.role !== 'DRIVER') {
    return res.status(403).json({ message: 'Only drivers can respond to ride requests' });
  }

  if (!['ACCEPTED', 'DECLINED'].includes(decision)) {
    return res.status(400).json({ message: 'Invalid decision value' });
  }

  try {
    const rideRequest = await prisma.rideRequest.findUnique({
      where: { id: parseInt(requestId as string, 10) },
      include: { ride: true },
    });

    if (!rideRequest) {
      return res.status(404).json({ message: 'Ride request not found' });
    }

    if (rideRequest.ride.driverId !== user.userId) {
      return res.status(403).json({ message: 'You are not the driver of this ride' });
    }

    if (decision === RideRequestStatus.ACCEPTED) {
      if (rideRequest.ride.seatsAvailable <= 0) {
        return res.status(403).json({ message: "No seats available in this ride" })
      }

      await prisma.ride.update({
        where: { id: rideRequest.rideId },
        data: {
          seatsAvailable: { decrement: 1 },
        },
      });
    }

    const updatedRequest = await prisma.rideRequest.update({
      where: { id: rideRequest.id },
      data: { status: decision },
    });

    await createNotification(
      rideRequest.passengerId,
      decision === RideRequestStatus.ACCEPTED
        ? `Your request to join the ride from ${rideRequest.ride.origin} to ${rideRequest.ride.destination} has been accepted.`
        : `Your request was declined.`,
      'REQUEST_RESPONSE'
    )

    res.status(200).json({ message: `Request ${decision.toLowerCase()}`, data: updatedRequest });
  } catch{
    res.status(500).json({ message: 'Error responding to ride request' });
  }
};

export const getRideRequestsForDriver = async (req: Request, res: Response) => {
  const user = (req as any).user;

  if (user.role !== 'DRIVER') {
    return res.status(403).json({ message: 'Only drivers can view ride requests' });
  }

  try {
    const rideRequests = await prisma.rideRequest.findMany({
      where: {
        ride: {
          driverId: user.userId,
        },
      },
      include: {
        passenger: true,
        ride: true,
      },
    });

    res.status(200).json({ rideRequests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ride requests', error });
  }
};

export const cancelRideRequest = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { requestId } = req.params;

  // if (user.role !== 'PASSENGER') {
  //   return res.status(403).json({ message: 'Only passengers can cancel their ride requests' });
  // }

  try {
    const rideRequest = await prisma.rideRequest.findUnique({
      where: { id: parseInt(requestId as string, 10) },
      include: { ride: true },
    });

    if (!rideRequest) {
      return res.status(404).json({ message: 'Ride request not found' });
    }

    if (rideRequest.passengerId !== user.userId) {
      return res.status(403).json({ message: 'You can only cancel your own request' });
    }

    if (rideRequest.status === RideRequestStatus.ACCEPTED) {
      await prisma.ride.update({
        where: { id: rideRequest.rideId },
        data: { seatsAvailable: { increment: 1 } },
      });
    }

    const cancelledRequest = await prisma.rideRequest.update({
      where: { id: rideRequest.id },
      data: { status: RideRequestStatus.CANCELLED },
    });

    await createNotification(
      rideRequest.ride.driverId!,
      `Passenger ${user.name} has cancelled their request to join your ride.`,
      'REQUEST_CANCELLED'
    )

    res.status(200).json({ message: 'Ride request cancelled', cancelledRequest });
  } catch{
    res.status(500).json({ message: 'Error cancelling ride request' });
  }
};
