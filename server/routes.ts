import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for timer sessions
  app.get("/api/timer-sessions/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const timerSession = await storage.getTimerSessionByUserId(userId);
      if (!timerSession) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.json(timerSession);
    } catch (error) {
      console.error("Error fetching timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/timer-sessions", async (req, res) => {
    try {
      const timerSession = await storage.createTimerSession(req.body);
      return res.status(201).json(timerSession);
    } catch (error) {
      console.error("Error creating timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/timer-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid timer session ID" });
      }
      
      const updated = await storage.updateTimerSession(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.json(updated);
    } catch (error) {
      console.error("Error updating timer session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/timer-sessions/:id/complete-cycle", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid timer session ID" });
      }
      
      const updated = await storage.incrementCompletedCycles(id);
      if (!updated) {
        return res.status(404).json({ message: "Timer session not found" });
      }
      
      return res.json(updated);
    } catch (error) {
      console.error("Error incrementing completed cycles:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
