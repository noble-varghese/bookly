// src/dataloaders/index.ts
import DataLoader from 'dataloader';
import { Author, Book } from '@bookly/database';

export const createLoaders = () => ({
  authorLoader: new DataLoader(async (ids: readonly string[]) => {
    const authors = await Author.findAll({ where: { id: ids } });
    const authorMap = new Map(authors.map(author => [author.id, author]));
    return ids.map(id => authorMap.get(id));
  }),

  booksByAuthorLoader: new DataLoader(async (authorIds: readonly string[]) => {
    const books = await Book.findAll({ where: { authorId: authorIds } });
    const bookMap = authorIds.reduce((acc, id) => {
      acc.set(id, books.filter(book => book.authorId === id));
      return acc;
    }, new Map());
    return authorIds.map(id => bookMap.get(id) || []);
  })
});

export type Loaders = ReturnType<typeof createLoaders>;