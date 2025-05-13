import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Timer sessions for saving user preferences
export const timerSessions = pgTable("timer_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  focusTime: integer("focus_time").notNull().default(25),
  breakTime: integer("break_time").notNull().default(5),
  completedCycles: integer("completed_cycles").notNull().default(0),
  lastVideoId: text("last_video_id").default("GjgkrklG4rA"),
  playSoundNotification: boolean("play_sound_notification").notNull().default(true),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTimerSessionSchema = createInsertSchema(timerSessions).pick({
  userId: true,
  focusTime: true,
  breakTime: true,
  completedCycles: true,
  lastVideoId: true,
  playSoundNotification: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTimerSession = z.infer<typeof insertTimerSessionSchema>;
export type TimerSession = typeof timerSessions.$inferSelect;
