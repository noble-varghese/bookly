import { QueryResolvers, MutationResolvers, Resolvers } from '@bookly/graphql-schema/src/types/generated';
import { queries } from './queries';
import { mutations } from './mutations';
import { Context } from '@bookly/graphql-schema/src/context';


interface UserResolvers {
  Query: QueryResolvers<Context>;
  Mutation: MutationResolvers<Context>;
}

export const userResolvers: Resolvers<Context> = {
    Query: queries,
    Mutation: mutations
};