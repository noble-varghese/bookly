import { startApolloServer } from '../src/app';

import { createServer } from 'http';
import { Request, Response } from 'express';

let apolloServerPromise: Promise<any> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!apolloServerPromise) {
    // Initialize the server only once
    apolloServerPromise = startApolloServer();
  }
  
  const { app } = await apolloServerPromise;
  
  // Forward the request to the Express app
  return app(req, res);
}