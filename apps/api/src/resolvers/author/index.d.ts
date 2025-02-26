import { Resolvers } from '@bookly/graphql-schema/src/types/generated';
import { Context } from '../../context';
export declare const authorResolvers: Resolvers;
export declare const Author: {
    books: (parent: any, _: any, { loaders }: Context) => Promise<any>;
};
