import { Resolvers } from '../../types/generated';
import { mutations } from './mutations';
import { queries } from './queries';

export const userResolvers: Resolvers = {
    Query: queries,
    Mutation: mutations
};