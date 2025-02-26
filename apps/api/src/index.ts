import { config } from 'dotenv';
import { startApolloServer } from './app';
import { logger } from './utils/logger';

// Load environment variables
config({ path: '.env' });

// Only start the server in development mode
// Vercel will use the serverless function in production
if (process.env.NODE_ENV !== 'production') {
  startApolloServer()
    .then(({ httpServer }) => {
      httpServer.listen({ port: 4000 }, () => {
        logger.info(`🚀 Server ready at http://localhost:4000/graphql`);
      });
    })
    .catch((err) => {
      console.error('Error starting server:', err);
      process.exit(1);
    });
}