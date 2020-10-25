import path from 'path';
import knex from 'knex';

require('dotenv-safe').config();

const connection = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    ssl: true
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
  useNullAsDefault: true,
});

export default connection;