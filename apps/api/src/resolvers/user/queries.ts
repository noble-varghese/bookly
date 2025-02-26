import { QueryResolvers } from '@bookly/graphql-schema/src/types/generated';
import { User } from '@bookly/database';
import { logger } from '../../utils/logger';

export const queries: QueryResolvers = {
  users: async () => {
    try {
        logger.info('Comes for users query....')
        return await User.findAll();
    }catch (error) {
        logger.error(error)
        throw error
    }
  },
  user: async (_, { email }) => {
    try {
      logger.info(`Fetching user with email: ${email}`);
      const user = await User.findOne({
        where: { email }
      });
      
      if (!user) {
        logger.info(`No user found with email: ${email}`);
        return null;
      }

      return user;
    } catch (error) {
      logger.error(`Error fetching user with email ${email}:`, error);
      throw error;
    }
  }
};