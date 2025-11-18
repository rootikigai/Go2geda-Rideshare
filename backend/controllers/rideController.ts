import type { Request, Response } from 'express'
import { PrismaClient, RideRequestStatus, RideStatus } from '@prisma/client';
import { createNotification } from './notificationController.ts';

const prisma = new PrismaClient();

export const createRide = async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user.role !== 'DRIVER') {
        return res.status(403).json({ message: 'Only drivers can create rides' })
    }
    const { origin, destination, seatsAvailable, departureTime, price } = req.body;

    try {
        const ride = await prisma.ride.create({
            data: {
                origin,
                destination,
                driverId: Number(user.userId),
                seatsAvailable: Number(seatsAvailable),
                departureTime: new Date(departureTime),
                price: String(price),
                status: RideStatus.SCHEDULED,
            },
        });

        await createNotification(
            user.userId,
            `Your ride from ${ride.origin} to ${ride.destination} has been created.`,
            'RIDE_CREATED'
        );

        res.status(201).json({ message: 'Ride created successfully', data: ride });
    } catch (error) {
        const err = error as Error;
        console.error('Create Ride error:', err);
        res.status(500).json({ message: 'Error creating ride', error: err.message });
    }
};

export const getUserRides = async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
        let rides;
        if (user.role === 'PASSENGER') {
            rides = await prisma.ride.findMany({
                where: {
                    status: 'SCHEDULED',
                    seatsAvailable: { gt: 0 },
                },
            });
        }
        else if (user.role === 'DRIVER') {
            rides = await prisma.ride.findMany({
                where: {
                    driverId: user.userId,
                    status: {
                        in: ['SCHEDULED', 'ONGOING']
                    },
                },
            });
        }
        else if (user.role === "ADMIN") {
            rides = await prisma.ride.findMany();
        }
        else {
            return res.status(403).json({ message: 'Invalid role' })
        }

        res.status(200).json({ rides });
    } catch (error) {
        res.status(500).json({ message: "Error fetching rides", error });
    }
};

export const completeRide = async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const user = (req as any).user;

    if (user.role !== 'DRIVER') {
        return res.status(403).json({ message: 'Only drivers can complete rides' });
    }

    try {
        const ride = await prisma.ride.update({
            where: { id: parseInt(rideId as string, 10) },
            data: { status: RideStatus.COMPLETED }
        });
        res.status(200).json({ message: 'Ride marked as completed', data: ride });
    } catch {
        res.status(500).json({ message: 'Error completing ride' });
    }
};

export const cancelRide = async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const user = (req as any).user;

    if (!['DRIVER', 'ADMIN'].includes(user.role)) {
        return res.status(403).json({ message: 'Only drivers or admins can cancel rides' });
    }

    try {
        const rideIdNum = parseInt(rideId as string, 10);

        const ride = await prisma.ride.findUnique({ where: { id: rideIdNum } });
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }
        if (user.role === 'DRIVER' && ride.driverId !== user.userId) {
            return res.status(403).json({ message: 'You are not the driver of this ride' });
        }

        const cancelledRide = await prisma.ride.update({
            where: { id: rideIdNum },
            data: { status: RideStatus.CANCELLED },
        });

        const requests = await prisma.rideRequest.findMany({
            where: { rideId: rideIdNum, status: { in: [RideRequestStatus.PENDING, RideRequestStatus.ACCEPTED] } },
        });

        await prisma.rideRequest.updateMany({
            where: { rideId: rideIdNum, status: { in: [RideRequestStatus.PENDING, RideRequestStatus.ACCEPTED] } },
            data: { status: RideRequestStatus.CANCELLED },
        });

        for (const request of requests) {
            await createNotification(
                request.passengerId,
                `Your request to join the ride from ${ride.origin} to ${ride.destination} has been cancelled by the driver.`,
                'RIDE_CANCELLED'
            );
        }

        res.status(200).json({ message: 'Ride cancelled', cancelledRide });
    } catch {
        res.status(500).json({ message: 'Error cancelling ride' });
    }
};
