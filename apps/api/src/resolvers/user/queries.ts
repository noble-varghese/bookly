import { QueryResolvers } from '@bookly/graphql-schema/src/types/generated';
import { User } from '@bookly/database';
import { Context } from '@bookly/graphql-schema/src/context';
import { logger } from '../../utils/logger';

export const queries: QueryResolvers<Context> = {
  users: async () => {
    try {
        logger.info('Comes for users query....')
        return await User.findAll();
    }catch (error) {
        logger.error(error)
        throw error
    }
  },
  user: async (_, { id }) => {
    return await User.findByPk(id);
  }
};