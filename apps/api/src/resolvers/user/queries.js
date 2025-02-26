"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const database_1 = require("@bookly/database");
const logger_1 = require("../../utils/logger");
exports.queries = {
    users: async () => {
        try {
            logger_1.logger.info('Comes for users query....');
            return await database_1.User.findAll();
        }
        catch (error) {
            logger_1.logger.error(error);
            throw error;
        }
    },
    user: async (_, { email }) => {
        try {
            logger_1.logger.info(`Fetching user with email: ${email}`);
            const user = await database_1.User.findOne({
                where: { email }
            });
            if (!user) {
                logger_1.logger.info(`No user found with email: ${email}`);
                return null;
            }
            return user;
        }
        catch (error) {
            logger_1.logger.error(`Error fetching user with email ${email}:`, error);
            throw error;
        }
    }
};
