import { Dialect, Options } from 'sequelize';

export interface DatabaseConfig extends Options {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  dialect: Dialect;
}

export interface SequelizeConfig {
  development: DatabaseConfig;
  production: DatabaseConfig;
  [key: string]: DatabaseConfig;
}