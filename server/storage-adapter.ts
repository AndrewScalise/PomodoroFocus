// This file adapts the storage interface for Vercel's serverless environment
import { ServerlessStorage, serverlessStorage } from '../lib/serverless-storage';
import { IStorage } from './storage';

// Export the appropriate storage implementation
export const storage: IStorage = process.env.VERCEL 
  ? serverlessStorage 
  : require('./storage').storage;