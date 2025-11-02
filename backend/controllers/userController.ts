import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
// import { users } from '../models/User.ts';
// import type { User } from '../models/User.ts';

// let userIdCounter = 1;

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Kindly fill out all fields' });
  }
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = await prisma.user.create({
    data: { name, email, password }
  });
  res.status(201).json({ message: 'User registered', userId: newUser.id }
  );
  // const existingUser = users.find(u => u.email === email);
  // if (existingUser) return res.status(400).json({ message: 'User exists' });

  // const newUser: User = { id: userIdCounter++, name, email, password };
  // users.push(newUser);
  // res.status(201).json({ message: 'User registered', userId: newUser.id });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Kindly fill out all fields' });
  }

  const user = await prisma.user.findUnique({
    where: { email, password }
  });
  // const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.status(200).json({ message: 'Login successful', userId: user.id });
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ id: user.id, name: user.name, email: user.email });
};