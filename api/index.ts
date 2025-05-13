import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage';

// API route handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Route based on the path and method
  const path = req.url?.split('/api/')[1];
  
  if (req.method === 'GET' && path?.startsWith('timer-sessions/')) {
    // Handle GET /api/timer-sessions/:userId
    const userId = parseInt(path.split('/')[1]);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    try {
      const timerSession = await storage.getTimerSessionByUserId(userId);
      if (!timerSession) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.status(200).json(timerSession);
    } catch (error) {
      console.error("Error fetching timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Handle unsupported routes
    return res.status(404).json({ message: "API route not found" });
  }
}