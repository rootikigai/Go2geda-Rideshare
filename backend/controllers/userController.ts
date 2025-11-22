import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { users } from '../models/User.ts';
// import type { User } from '../models/User.ts';

// let userIdCounter = 1;

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Kindly fill out all fields' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role }
    });
    res.status(201).json({ message: 'User registered', userId: newUser.id }
    );
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something supped during signup' });
  }

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

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    // const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
  
    res.status(200).json({ message: 'Login successful', userId: user.id, token});
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something supped during login' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }
  
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Get User Profile error:', error);
    res.status(500).json({ message: 'Something supped while fetching user profile' })
  }
};