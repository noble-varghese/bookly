import { Resolvers } from '../../types/generated';
import { mutations } from './mutation';
import { queries } from './queries';
import { Context } from '../../context';

export const authorResolvers: Resolvers = {
    Query: queries,
    Mutation: mutations,
}

export const Author = {
    books: async (parent: any, _: any, { loaders }: Context) => {
        return loaders.booksByAuthorLoader.load(parent.id);
    }
};
