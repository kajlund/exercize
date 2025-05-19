import knex from 'knex';

import knexFile from '../knexfile.js';
import getConfig from './config.js';
import getLogger from './logger.js';

const cnf = getConfig();
const log = getLogger({ cnf });
const conn = knex(knexFile[cnf.nodeEnv]);

export default function getDB() {
  return {
    knex: conn,
    connect: async () => {
      try {
        await conn.raw('SELECT 1+1 AS result');
        log.info('Database connection established');
      } catch (error) {
        log.error(error, 'Database connection failed:');
        throw error;
      }
    },
    disconnect: async () => {
      try {
        await conn.destroy();
        log.info('Database connection closed');
      } catch (error) {
        log.error(error, 'Error closing database connection:');
        throw error;
      }
    },
  };
}
