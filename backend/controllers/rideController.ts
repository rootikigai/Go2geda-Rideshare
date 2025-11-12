import type { Request, Response } from 'express'
import { PrismaClient, RideStatus } from '@prisma/client';

const prisma = new PrismaClient();

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
                driverId: user.userId,
                seatsAvailable,
                departureTime,
                price,
                status: 'SCHEDULED'
            }
        })
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ride', error });
    }
};

export const completeRide = async (req: Request, res: Response) => {
    const { rideId } = req.params;
    const user = (req as any).user;

    if (user.role !== 'DRIVER') {
        return res.status(403).json({ message: 'Only drivers can complete rides' });
    }

    try {
        const rideIdNum = parseInt(rideId as string, 10);
        const ride = await prisma.ride.update({
            where: { id: rideIdNum },
            data: { status: RideStatus.COMPLETED }
        });
        res.status(200).json({ message: 'Ride marked as completed', ride });
    } catch (error) {
        res.status(500).json({ message: 'Error completing ride', error });
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
        if (ride.driverId !== user.userId) {
            return res.status(403).json({ message: 'You are not the driver of this ride' });
        }

        const cancelledRide = await prisma.ride.update({
            where: { id: rideIdNum },
            data: { status: 'CANCELLED' },
        });

        await prisma.rideRequest.updateMany({
            where: { rideId: rideIdNum, status: 'PENDING' },
            data: { status: 'CANCELLED' },
        });

        res.status(200).json({ message: 'Ride cancelled successfully', cancelledRide });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling ride', error });
    }
};
