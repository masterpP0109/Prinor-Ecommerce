import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../lib/db/mongodb';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Use environment variable for security

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({ token, user: { id: user.id, role: user.role } });
}