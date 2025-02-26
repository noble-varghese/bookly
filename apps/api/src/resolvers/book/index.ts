// src/resolvers/book/index.ts
import { Resolvers } from '../../types/generated';
import { Context } from '../../context';
import { mutations } from './mutation';
import { queries } from './queries';
import { logger } from '../../utils/logger';

export const bookResolvers: Resolvers = {
    Query: queries,
    Mutation: mutations
}

export const Book = {
    author: async (parent: any, _: any , { loaders }: Context) => {
        logger.debug('Query!')
        return loaders.authorLoader.load(parent.authorId);
    }
};