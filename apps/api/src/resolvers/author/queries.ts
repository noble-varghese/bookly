import { QueryResolvers } from '@bookly/graphql-schema/src/types/generated';
import { Author, Book } from '@bookly/database';
import { logger } from '../../utils/logger';

export const queries: QueryResolvers= {
  authors: async(_, {limit=10, page=1}) => {
    try{
      const offset = (page - 1) * limit; 
      return await Author.findAll({limit: 10,  offset, order: [['createdAt', 'DESC']]})
    }catch(error) {
      logger.error(`Error fetching authors ${error}`)
      throw new Error(`Error fetching authors`)
    }
  }
};