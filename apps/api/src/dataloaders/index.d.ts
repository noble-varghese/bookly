import DataLoader from 'dataloader';
import { Author } from '@bookly/database';
export declare const createLoaders: () => {
    authorLoader: DataLoader<string, Author | undefined, string>;
    booksByAuthorLoader: DataLoader<string, any, string>;
};
export type Loaders = ReturnType<typeof createLoaders>;
