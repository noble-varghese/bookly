import { Book } from '@bookly/database';
import { MutationResolvers } from '@bookly/graphql-schema/src/types/generated';
import { Context } from '../../context';
import { logger } from '../../utils/logger';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../utils/supabaseClient';
import { UUIDV4 } from 'sequelize';

export const mutations: MutationResolvers = {

  createBook: async (_, { input: { title, description, authorId, publishedDate, coverUrl } }, { loaders }: Context) => {
    try {
      logger.info('Creating new Book....!!');
      logger.info({ title, description, authorId, publishedDate })
      // Now save the book to your database with the cover URL
      const book = await Book.create({
        title,
        description,
        publishedDate,
        authorId,
        coverUrl: coverUrl || null,
      } as Book);

      return book;
    } catch (error) {
      logger.info(error)
      throw new Error('Failed to create book!');
    }
  },

  updateBook: async (_, { id, input }) => {
    try {
      const existingBook = await Book.findByPk(id);
  
      if (!existingBook) {
        throw new Error(`Book with ID ${id} not found`);
      }

      const data: any = {}
      if (input.title)  data['title'] = input.title
      if (input.authorId)  data['authorId'] = input.authorId
      if (input.description)  data['description'] = input.description
      if (input.publishedDate)  data['publishedDate'] = input.publishedDate
      if (input.coverUrl)  data['publishedDate'] = input.coverUrl
      
      await Book.update({
        ...data
      }, {where: {id}})

      const book = await Book.findByPk(id) || {}
      return book
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to edit the book!')
    }
  },

  deleteBook: async (__dirname, { id }) => {
    try {
      await Book.destroy({ where: { id } })
      return true
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to delete the book!')
    }
  }
};