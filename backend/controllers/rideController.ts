import type { Request, Response } from 'express'
import { PrismaClient, RideStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserRides = async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
        let rides;
        if(user.role === 'PASSENGER'){
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
        else{
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
        const rideIdNum = parseInt(rideId as string,10);
        const ride = await prisma.ride.update({
            where: { id: rideIdNum },
            data: { status: RideStatus.COMPLETED }
        });
        res.status(200).json({ message: 'Ride marked as completed', ride });
    } catch (error) {
        res.status(500).json({ message: 'Error completing ride', error });
    }
};

export const createRide = async (req: Request, res: Response) => {
    const user = (req as any).user;

    if (user.role !== 'DRIVER') {
        return res.status(403).json({message: 'Only drivers can create rides'})
    }
    const { origin, destination, seatsAvailable } = req.body;

    try {
        const ride = await prisma.ride.create({
            data: {
                origin,
                destination,
                passengerId: user.userId,
                seatsAvailable,
                requestStatus: 'PENDING',
                status: 'SCHEDULED'
            }
        })
        res.status(201).json({ message: 'Ride created successfully', ride });
    } catch (error) {
        res.status(500).json({ message: 'Error creating ride', error });
    }
};