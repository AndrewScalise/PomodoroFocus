import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

// API route handler for creating timer sessions
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const timerSession = await storage.createTimerSession(req.body);
      return res.status(201).json(timerSession);
    } catch (error) {
      console.error("Error creating timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}