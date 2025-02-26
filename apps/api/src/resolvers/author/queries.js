"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.queries = {
    authors: async (_, { limit = 10, page = 1 }) => {
        try {
            const offset = (page - 1) * limit;
            return await database_1.Author.findAll({ limit: 10, offset, order: [['createdAt', 'DESC']] });
        }
        catch (error) {
            logger_1.logger.error(`Error fetching authors ${error}`);
            throw new Error(`Error fetching authors`);
        }
    }
};
