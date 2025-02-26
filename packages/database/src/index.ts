import { sequelize } from './config/sequelize';
import { logger } from './utils/logger';
export * from './models';

export * from './models';

export const initDatabase = async() => {
  try {
    logger.info('Starting the database connection...')
    await sequelize.authenticate({logging: false});
    logger.info('Database connection established successfully.');

    // await sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    // console.log('Database models synchronized.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
}