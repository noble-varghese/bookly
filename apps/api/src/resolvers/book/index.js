"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.bookResolvers = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
const logger_1 = require("../../utils/logger");
exports.bookResolvers = {
    Query: queries_1.queries,
    Mutation: mutation_1.mutations
};
exports.Book = {
    author: async (parent, _, { loaders }) => {
        logger_1.logger.debug('Query!');
        return loaders.authorLoader.load(parent.authorId);
    }
};
