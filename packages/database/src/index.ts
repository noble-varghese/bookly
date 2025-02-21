import { sequelize } from './config/sequelize';
import { logger } from './utils/logger';
export * from './models';

export * from './models';

export const initDatabase = async() => {
  try {
    logger.info('Starting the database connection...')
    await sequelize.authenticate({logging: false});
    logger.info('Database connection established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
}