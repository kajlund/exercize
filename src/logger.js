import pino from 'pino';

import getConfig from './config.js';

export default function getLogger(opt = { cnf: getConfig() }) {
  const { cnf } = opt;

  const logConfig = {
    level: cnf.logLevel,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  };

  // pretty-printing in development mode
  if (!cnf.isProd) {
    logConfig.transport = {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    };
  }
  return pino(logConfig);
}
