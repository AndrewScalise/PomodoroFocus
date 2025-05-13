import { 
  users, 
  timerSessions, 
  type User, 
  type InsertUser,
  type TimerSession,
  type InsertTimerSession
} from "@shared/schema";

// Storage interface for CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Timer session operations
  getTimerSession(id: number): Promise<TimerSession | undefined>;
  getTimerSessionByUserId(userId: number): Promise<TimerSession | undefined>;
  createTimerSession(session: InsertTimerSession): Promise<TimerSession>;
  updateTimerSession(id: number, session: Partial<InsertTimerSession>): Promise<TimerSession | undefined>;
  incrementCompletedCycles(id: number): Promise<TimerSession | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private timerSessions: Map<number, TimerSession>;
  private userIdCounter: number;
  private sessionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.timerSessions = new Map();
    this.userIdCounter = 1;
    this.sessionIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Timer session operations
  async getTimerSession(id: number): Promise<TimerSession | undefined> {
    return this.timerSessions.get(id);
  }
  
  async getTimerSessionByUserId(userId: number): Promise<TimerSession | undefined> {
    return Array.from(this.timerSessions.values()).find(
      (session) => session.userId === userId,
    );
  }
  
  async createTimerSession(insertSession: InsertTimerSession): Promise<TimerSession> {
    const id = this.sessionIdCounter++;
    const session: TimerSession = { ...insertSession, id };
    this.timerSessions.set(id, session);
    return session;
  }
  
  async updateTimerSession(id: number, updates: Partial<InsertTimerSession>): Promise<TimerSession | undefined> {
    const session = await this.getTimerSession(id);
    if (!session) {
      return undefined;
    }
    
    const updatedSession: TimerSession = { ...session, ...updates };
    this.timerSessions.set(id, updatedSession);
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
    this.timerSessions.set(id, updatedSession);
    return updatedSession;
  }
}

export const storage = new MemStorage();
