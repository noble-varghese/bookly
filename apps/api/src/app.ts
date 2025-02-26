import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { schema } from './context';
import { resolvers } from './resolvers';
import { initDatabase } from '../src/config/database';
import { createContext } from './context';
import { SupabaseClientInit } from './utils/supabaseClient';

const typeDefs = schema;

interface Context {
  token?: string;
}

// Debug logging
console.log('Schema content:', JSON.stringify(typeDefs));
console.log('Resolver keys:', Object.keys(resolvers));
if (resolvers.Query) {
  console.log('Query resolver fields:', Object.keys(resolvers.Query));
}

export async function startApolloServer() {
  await initDatabase();
  const app = express();
  const httpServer = http.createServer(app);
  SupabaseClientInit.init();

  // Set up Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the server
  await server.start();

  const apolloMiddleware = expressMiddleware(server, {
    context: async ({ req }: { req: any }) => ({
      ...createContext(),
      token: req.headers.authorization || '',
    })
  }) as express.RequestHandler;

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    apolloMiddleware
  );
  
  app.get('/', (req: any, res: any) => {
    res.status(200).send('API is running');
  });

  // No longer starting the server here - this is done in index.ts for dev
  // and handled by Vercel in production

  return { app, httpServer, server };
}