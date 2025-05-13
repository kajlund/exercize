import 'dotenv/config';

console.log(`Knex running in env: ${process.env.NODE_ENV}`);

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: '[DB_USER]',
      password: '[DB_PASSWORD]',
      database: '[DB_NAME]',
      charset: 'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: '/data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: '/data/seeds',
    },
  },
};
