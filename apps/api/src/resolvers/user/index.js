"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
exports.userResolvers = {
    Query: queries_1.queries,
    Mutation: mutations_1.mutations
};
