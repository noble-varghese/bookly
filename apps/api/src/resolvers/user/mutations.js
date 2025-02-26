"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.mutations = {
    createUser: async (_, { input }) => {
        try {
            logger_1.logger.info('Creating new users....!!');
            logger_1.logger.info(input);
            const user = await database_1.User.create({
                name: input.name,
                email: input.email,
                avatarUrl: input.avatarUrl
            }, {
                returning: true
            });
            return user;
        }
        catch (error) {
            throw new Error('Failed to create user');
        }
    },
    deleteUser: async (_, { id }) => {
        const deleted = await database_1.User.destroy({ where: { id } });
        return deleted > 0;
    }
};
