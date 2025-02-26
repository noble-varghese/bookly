import { MutationResolvers } from '@bookly/graphql-schema/src/types/generated';
import { User, UserAttributes} from '@bookly/database';
import { logger } from '../../utils/logger';

export const mutations: MutationResolvers = {

  createUser: async (_, { input }) => {
    try {
      logger.info('Creating new users....!!')
      logger.info(input)
      const user = await User.create({
        name: input.name,
        email: input.email,
        avatarUrl: input.avatarUrl
      } as UserAttributes, {
        returning: true 
      });

      return user
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
  
  deleteUser: async (_, { id }) => {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
};