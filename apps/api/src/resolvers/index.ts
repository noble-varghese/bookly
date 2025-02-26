// apps/api/src/resolvers/index.ts
import { authorResolvers, Author } from './author';
import { bookResolvers, Book } from './book';
import { userResolvers} from './user';

export const resolvers = {
    Query: {
      ...userResolvers.Query,
      ...bookResolvers.Query,
      ...authorResolvers.Query
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...authorResolvers.Mutation,
      ...bookResolvers.Mutation
    },
    Book,
    Author
  };