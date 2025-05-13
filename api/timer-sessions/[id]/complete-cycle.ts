import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../../../server/storage';

// API route handler for completing a timer cycle
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid timer session ID" });
  }

  if (req.method === 'POST') {
    try {
      const updated = await storage.incrementCompletedCycles(id);
      if (!updated) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error incrementing completed cycles:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}