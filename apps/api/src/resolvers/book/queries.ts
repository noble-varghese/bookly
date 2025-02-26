import { QueryResolvers } from '@bookly/graphql-schema/src/types/generated';
import { Book } from '@bookly/database';
import { logger } from '../../utils/logger';

export const queries: QueryResolvers= {
  books: async (_, {limit=10, page=1}) => {
    try {
        logger.info('Fetching books with pagination', { page, limit });
      
        const offset = (page - 1) * limit; 
        return await Book.findAll({limit, offset, order: [['createdAt', 'DESC']] });
    }catch (error) {
        logger.error(error)
        throw error
    }
  },
  book: async (_, {id}) => {
    try {
        logger.info('Comes for users query....')
        return await Book.findByPk(id,{include: ['author']});
    } catch(error) {
        logger.error(error)
        throw error
    }
  }
};