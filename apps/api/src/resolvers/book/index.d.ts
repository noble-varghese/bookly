import { Resolvers } from '@bookly/graphql-schema/src/types/generated';
import { Context } from '../../context';
export declare const bookResolvers: Resolvers;
export declare const Book: {
    author: (parent: any, _: any, { loaders }: Context) => Promise<import("@bookly/database").Author | undefined>;
};
