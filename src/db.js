import knex from 'knex';

import knexConfigs from '../knexfile.js';
import getConfig from './config.js';

export default function (opt = { cnf: getConfig(), knexCnfs: knexConfigs }) {
  const { cnf, knexCnfs } = opt;

  return knex(knexCnfs[cnf.nodeEnv]);
}
