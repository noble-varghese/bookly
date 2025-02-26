import { Author, } from '@bookly/database';
import { MutationResolvers } from '@bookly/graphql-schema/src/types/generated';
import { Context } from '../../context';
import { logger } from '../../utils/logger';

export const mutations: MutationResolvers = {
  createAuthor: async(_, {input: {name, biography, bornDate, avatarUrl}}, {loaders}: Context) => {
    try{
      logger.info('Creating new Authors....!!')
      const author = await Author.create({name, biography, bornDate, avatarUrl} as Author, {
        returning: true 
      });

      return author

    } catch(error) {
      throw new Error('Error creating author !')
    }
  },

  deleteAuthor: async (__dirname, {id}) => {
    try {
      await Author.destroy({where: {id}})
      return true
    }catch(error) {
      logger.error(error)
      throw new Error('Failed to delete the book!')
    }
  }
};