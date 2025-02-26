"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoaders = void 0;
// src/dataloaders/index.ts
const dataloader_1 = __importDefault(require("dataloader"));
const database_1 = require("@bookly/database");
const createLoaders = () => ({
    authorLoader: new dataloader_1.default(async (ids) => {
        const authors = await database_1.Author.findAll({ where: { id: ids } });
        const authorMap = new Map(authors.map(author => [author.id, author]));
        return ids.map(id => authorMap.get(id));
    }),
    booksByAuthorLoader: new dataloader_1.default(async (authorIds) => {
        const books = await database_1.Book.findAll({ where: { authorId: authorIds } });
        const bookMap = authorIds.reduce((acc, id) => {
            acc.set(id, books.filter(book => book.authorId === id));
            return acc;
        }, new Map());
        return authorIds.map(id => bookMap.get(id) || []);
    })
});
exports.createLoaders = createLoaders;
