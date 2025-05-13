import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../../server/storage';

// API route handler for updating timer sessions by ID
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid timer session ID" });
  }

  if (req.method === 'PUT') {
    try {
      const updated = await storage.updateTimerSession(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.status(200).json(updated);
    } catch (error) {
      console.error("Error updating timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}