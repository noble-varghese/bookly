"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = exports.authorResolvers = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
exports.authorResolvers = {
    Query: queries_1.queries,
    Mutation: mutation_1.mutations,
};
exports.Author = {
    books: async (parent, _, { loaders }) => {
        return loaders.booksByAuthorLoader.load(parent.id);
    }
};
