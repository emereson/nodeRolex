import { Sequelize } from 'sequelize';

const db = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  logging: false,
});

export { db };
