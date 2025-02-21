import { MutationResolvers } from '@bookly/graphql-schema/src/types/generated';
import { User, UserAttributes} from '@bookly/database';
import { Context } from '@bookly/graphql-schema/src/context';

export const mutations: MutationResolvers<Context> = {

  createUser: async (_, { input }) => {
    try {
      const user = await User.create({
        name: input.name,
        email: input.email,
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