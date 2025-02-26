"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.mutations = {
    createBook: async (_, { input: { title, description, authorId, publishedDate, coverUrl } }, { loaders }) => {
        try {
            logger_1.logger.info('Creating new Book....!!');
            logger_1.logger.info({ title, description, authorId, publishedDate });
            // Now save the book to your database with the cover URL
            const book = await database_1.Book.create({
                title,
                description,
                publishedDate,
                authorId,
                coverUrl: coverUrl || null,
            });
            return book;
        }
        catch (error) {
            logger_1.logger.info(error);
            throw new Error('Failed to create book!');
        }
    },
    updateBook: async (_, { id, input }) => {
        try {
            const existingBook = await database_1.Book.findByPk(id);
            if (!existingBook) {
                throw new Error(`Book with ID ${id} not found`);
            }
            const data = {};
            if (input.title)
                data['title'] = input.title;
            if (input.authorId)
                data['authorId'] = input.authorId;
            if (input.description)
                data['description'] = input.description;
            if (input.publishedDate)
                data['publishedDate'] = input.publishedDate;
            if (input.coverUrl)
                data['publishedDate'] = input.coverUrl;
            await database_1.Book.update(Object.assign({}, data), { where: { id } });
            const book = await database_1.Book.findByPk(id) || {};
            return book;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error('Failed to edit the book!');
        }
    },
    deleteBook: async (__dirname, { id }) => {
        try {
            await database_1.Book.destroy({ where: { id } });
            return true;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error('Failed to delete the book!');
        }
    }
};
