import { User } from './user'
import { Author } from './author';
import { Book } from './book';

export * from './user'
export * from './author';
export * from './book';

Author.hasMany(Book, {
    foreignKey: 'authorId',
    as: 'books'
});

Book.belongsTo(Author, {
    foreignKey: 'authorId',
    as: 'author'
});

export const models = {
    User,
    Author,
    Book
}