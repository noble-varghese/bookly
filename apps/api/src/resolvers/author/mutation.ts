import { Author, } from '../../models';
import { MutationResolvers } from '../../types/generated';
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

  deleteAuthor: async (_, {id}) => {
    try {
      await Author.destroy({where: {id}})
      return true
    }catch(error) {
      logger.error(error)
      throw new Error('Failed to delete the book!')
    }
  },
   updateAuthor: async(_, {id, input}) => {
    try {
      const existingBook = await Author.findByPk(id);
  
      if (!existingBook) {
        throw new Error(`Book with ID ${id} not found`);
      }

      const data: any = {}
      if (input.name)  data['name'] = input.name
      if (input.bornDate)  data['bornDate'] = input.bornDate
      if (input.biography)  data['biography'] = input.biography
      if (input.avatarUrl)  data['avatarUrl'] = input.avatarUrl

      await Author.update({
        ...data
      }, {where: {id}})

      const author = await Author.findByPk(id) || {}
      return author
    }catch(error) {
      logger.error(error)
      throw new Error('Failed to delete the book!')
    }
   }
  
};