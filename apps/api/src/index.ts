// index.ts
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { schema } from '@bookly/graphql-schema'
import { logger } from './utils/logger';
import {resolvers} from './resolvers'
import {initDatabase} from '@bookly/database'
import { createContext } from './context';
import { SupabaseClientInit } from './utils/supabaseClient';

const typeDefs = schema

interface Context {
  token?: string;
}

async function startApolloServer() {
  await initDatabase()
  const app = express();
  const httpServer = http.createServer(app);
  SupabaseClientInit.init()

  // Set up Apollo Server
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start the server
  await server.start();

  const apolloMiddleware = expressMiddleware(server, {
    context: async ({ req }) => ({
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

  // Modified server startup
  await new Promise<void>((resolve) => {
    httpServer.listen({ port: 4000 }, resolve);
  });

  logger.info(`🚀 Server ready at http://localhost:4000/graphql`);
}

// Start the server with error handling
startApolloServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});