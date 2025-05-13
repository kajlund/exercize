import util from 'node:util';

import 'dotenv/config';

import getConfig from './config.js';
import getLogger from './logger.js';
import getApplication from './app.js';

const cnf = getConfig();
const log = getLogger({ cnf });
const app = getApplication({ cnf, log });

process.on('SIGINT', async () => {
  log.info('SIGINT signal received: closing HTTP server');
  await app.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  log.info('SIGTERM signal received: closing HTTP server');
  await app.stop();
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  log.fatal(`UNCAUGHT EXCEPTION - ${err.stack || err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  log.fatal(`UNHANDLED PROMISE REJECTION: ${util.inspect(p)} reason: ${reason}`);
  process.exit(1);
});

app.initialize();
await app.start();

export default app;
