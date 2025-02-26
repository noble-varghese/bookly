"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// apps/api/src/resolvers/index.ts
const author_1 = require("./author");
const book_1 = require("./book");
const user_1 = require("./user");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, user_1.userResolvers.Query), book_1.bookResolvers.Query), author_1.authorResolvers.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, user_1.userResolvers.Mutation), author_1.authorResolvers.Mutation), book_1.bookResolvers.Mutation),
    Book: book_1.Book,
    Author: author_1.Author
};
