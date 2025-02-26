"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.mutations = {
    createAuthor: async (_, { input: { name, biography, bornDate, avatarUrl } }, { loaders }) => {
        try {
            logger_1.logger.info('Creating new Authors....!!');
            const author = await database_1.Author.create({ name, biography, bornDate, avatarUrl }, {
                returning: true
            });
            return author;
        }
        catch (error) {
            throw new Error('Error creating author !');
        }
    },
    deleteAuthor: async (__dirname, { id }) => {
        try {
            await database_1.Author.destroy({ where: { id } });
            return true;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error('Failed to delete the book!');
        }
    }
};
