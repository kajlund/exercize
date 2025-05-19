// import path from 'node:path';

import express from 'express';
import httpLogger from 'pino-http';
import cors from 'cors';
import { ValidationError } from 'express-json-validator-middleware';

import status from './status.js';
import { BadRequestError, NotFoundError } from './errors.js';
import getConfig from './config.js';
import getLogger from './logger.js';
import getDB from './db.js';

import rootRoutes from './api/root.routes.js';
import { getCategoryRoutes } from './api/categories/category.routes.js';

// const whitelist = ['http://localhost:8080' /** other domains if any */]

// const corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }

export default function getApplication(opt = { cnf: getConfig(), log: getLogger() }) {
  const { cnf, log } = opt;
  const db = getDB();
  const app = express();
  const router = express.Router();

  function addGroupedRoutes(groups, prefix = '') {
    groups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        log.info(`Route: ${method} ${prefix}${group.prefix}${path}`);
        router[method](prefix + group.prefix + path, [...(group.middleware || []), ...middleware], handler);
      });
    });
  }

  return {
    app,
    initialize() {
      // Setup middleware
      app.disable('x-powered-by');
      app.set('trust proxy', 1); // trust first proxy
      app.use(express.json({ limit: '1000kb' }));
      app.use(express.urlencoded({ extended: false }));
      // Serve public
      // app.use(express.static(path.join(process.cwd(), "public")));
      app.use(
        cors({
          credentials: true,
          exposedHeaders: ['set-cookie'],
        }),
      );

      if (cnf.logHttp) {
        app.use(httpLogger({ logger: log }));
      }

      // Attach routes
      addGroupedRoutes([rootRoutes, getCategoryRoutes()]);
      app.use(router);

      // Add 404 handler
      app.use((req, _res, next) => {
        next(new NotFoundError(`Route ${req.originalUrl} was not found`));
      });

      // Add Generic Error handler
      // eslint-disable-next-line no-unused-vars
      app.use((err, req, res, next) => {
        // Default error response
        let error = {
          success: false,
          status: status.codes.INTERNAL_SERVER_ERROR,
          message: status.phrases.INTERNAL_SERVER_ERROR,
          detail: '',
          errors: null,
        };

        // Check if the error is a validation error
        if (err instanceof ValidationError) {
          err = new BadRequestError('', err.validationErrors);
        }

        if (err.isAppError) {
          error = err.response;
        } else {
          // Log unhandled
          log.error(err);
        }

        return res.status(error.status).json(error);
      });
    },
    async start() {
      log.info(`Environment: ${cnf.nodeEnv}`);
      log.info('Starting server...');

      try {
        await db.connect;
      } catch (err) {
        log.error(err, 'Database connection error:');
      }

      app.listen(cnf.port, () => {
        log.info(`Server running on p
          ort ${cnf.port}`);
      });
    },
    async stop() {
      try {
        await db.disconnect();
        log.info('Database connection closed');
      } catch (err) {
        log.error(err, 'Database disconnection error:');
      }
      log.info('Server stopped');
    },
  };
}
