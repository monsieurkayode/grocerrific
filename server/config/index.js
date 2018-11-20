import dotenv from 'dotenv';

dotenv.config();

const defaults = {
  prefix: 'mongodb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

const config = {
  development: {
    ...defaults,
    database: process.env.DB_NAME_DEV
  },
  test: {
    ...defaults,
    database: process.env.DB_NAME_TEST
  },
  production: {
    use_env_variable: 'MONGODB_URI'
  }
};

export default config;
