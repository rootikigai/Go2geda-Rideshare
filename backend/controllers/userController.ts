import type { Request, Response } from 'express';
import { users } from '../models/User.ts';
import type { User } from '../models/User.ts';

let userIdCounter = 1;

export const signup = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Fill out all fields' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User exists' });

  const newUser: User = { id: userIdCounter++, name, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', userId: newUser.id });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Fill out all fields' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: 'Login successful', userId: user.id });
};

export const getUserProfile = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ id: user.id, name: user.name, email: user.email });
};