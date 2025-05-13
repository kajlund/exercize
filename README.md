# Exercise

Node.js/Express REST API for recording exercise activities. Stored in SQLite DB using Knex.js query builder. It uses JSON schema validation with AJV, Pino logger and the Japa testing framework.

Instead of Nodemon the `--watch` flag for restarting the server in development mode is used (Node.js v18+)

The server loads environment variables using dotenv package until knex command can handle `--env-file` file flags.

### Dependencies

- [Ajv JSON schema validator](https://ajv.js.org/)
- [Express.js v4](https://expressjs.com/)
- [Knex.js](https://knexjs.org/) SQL Query Builder
- [SQLite](https://sqlite.org)
- [Pino](https://getpino.io/#/) logging
- [pino-http](https://github.com/pinojs/pino-http#readme)
- [pino-pretty](https://github.com/pinojs/pino-pretty#readme)

