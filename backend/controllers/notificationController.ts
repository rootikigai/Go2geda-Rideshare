import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async (userId: number, message: string, type: string) => {
    return prisma.notification.create({
        data: { userId, message, type },
    });
};

export const getUserNotifications = async (req: Request, res: Response) => {
    const user = (req as any).user;

    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: user.userId },
            orderBy: { createdAt: 'desc' },
        })
        res.status(200).json({ notifications });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const user = (req as any).user;

    try {
        const updated = await prisma.notification.updateMany({
            where: { id: parseInt(notificationId as string, 10), userId: user.userId },
            data: { read: true },
        });
        res.status(200).json({ message: 'Notification marked as read', updated });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error });
    }
};