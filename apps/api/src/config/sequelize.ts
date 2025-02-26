import { Options, Sequelize } from 'sequelize';

interface Config {
  development: Options;
  test?: Options;
  production?: Options;
} 

type envType = 'development' | 'test' | 'production'

export const config: Config = {
  development: {
    host: process.env.SUPABASE_HOST,
    port: 5432,
    database: process.env.SUPABASE_DATABASE,
    password: process.env.SUPABASE_PASSWORD,
    username: process.env.SUPABASE_USERNAME,
    logging: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    // test config
  },
  production: {
    host: process.env.SUPABASE_HOST,
    port: 5432,
    database: process.env.SUPABASE_DATABASE,
    password: process.env.SUPABASE_PASSWORD,
    username: process.env.SUPABASE_USERNAME,
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

const env = (process.env.NODE_ENV || 'development') as envType;
export const sequelize = new Sequelize(config[env]);