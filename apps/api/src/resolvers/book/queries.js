"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.queries = {
    books: async (_, { limit = 10, page = 1 }) => {
        try {
            logger_1.logger.info('Fetching books with pagination', { page, limit });
            const offset = (page - 1) * limit;
            return await database_1.Book.findAll({ limit, offset, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            logger_1.logger.error(error);
            throw error;
        }
    },
    book: async (_, { id }) => {
        try {
            logger_1.logger.info('Comes for users query....');
            return await database_1.Book.findByPk(id, { include: ['author'] });
        }
        catch (error) {
            logger_1.logger.error(error);
            throw error;
        }
    }
};
