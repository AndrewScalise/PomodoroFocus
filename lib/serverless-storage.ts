import { 
  type User, 
  type InsertUser,
  type TimerSession,
  type InsertTimerSession
} from "@shared/schema";
import { IStorage } from "../server/storage";

// Serverless storage implementation using Vercel KV (or other compatible storage)
export class ServerlessStorage implements IStorage {
  private static instance: ServerlessStorage;
  private userCache: Map<number, User>;
  private timerSessionCache: Map<number, TimerSession>;
  private userIdCounter: number;
  private sessionIdCounter: number;

  private constructor() {
    this.userCache = new Map();
    this.timerSessionCache = new Map();
    this.userIdCounter = 1;
    this.sessionIdCounter = 1;
  }

  public static getInstance(): ServerlessStorage {
    if (!ServerlessStorage.instance) {
      ServerlessStorage.instance = new ServerlessStorage();
    }
    return ServerlessStorage.instance;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.userCache.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.userCache.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.userCache.set(id, user);
    return user;
  }
  
  // Timer session operations
  async getTimerSession(id: number): Promise<TimerSession | undefined> {
    return this.timerSessionCache.get(id);
  }
  
  async getTimerSessionByUserId(userId: number): Promise<TimerSession | undefined> {
    return Array.from(this.timerSessionCache.values()).find(
      (session) => session.userId === userId,
    );
  }
  
  async createTimerSession(insertSession: InsertTimerSession): Promise<TimerSession> {
    const id = this.sessionIdCounter++;
    const session: TimerSession = { ...insertSession, id };
    this.timerSessionCache.set(id, session);
    return session;
  }
  
  async updateTimerSession(id: number, updates: Partial<InsertTimerSession>): Promise<TimerSession | undefined> {
    const session = await this.getTimerSession(id);
    if (!session) {
      return undefined;
    }
    
    const updatedSession: TimerSession = { ...session, ...updates };
    this.timerSessionCache.set(id, updatedSession);
    return updatedSession;
  }
  
  async incrementCompletedCycles(id: number): Promise<TimerSession | undefined> {
    const session = await this.getTimerSession(id);
    if (!session) {
      return undefined;
    }
    
    const updatedSession: TimerSession = { 
      ...session, 
      completedCycles: session.completedCycles + 1 
    };
    this.timerSessionCache.set(id, updatedSession);
    return updatedSession;
  }
}

// Export a singleton instance
export const serverlessStorage = ServerlessStorage.getInstance();