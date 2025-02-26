import { QueryResolvers } from '../../types/generated';
import { Author, Book } from '../../models';
import { logger } from '../../utils/logger';

export const queries: QueryResolvers= {
  authors: async(_, {limit=50, page=1}) => {
    try{
      const offset = (page - 1) * limit; 
      return await Author.findAll({limit,  offset, order: [['createdAt', 'DESC']]})
    }catch(error) {
      logger.error(`Error fetching authors ${error}`)
      throw new Error(`Error fetching authors`)
    }
  }
};