import Ajv from 'ajv';

const ajValidator = new Ajv({ allErrors: true, async: false });

const configSchema = {
  type: 'object',
  required: ['nodeEnv', 'port', 'logLevel', 'logHttp'],
  additionalProperties: false,
  properties: {
    isDev: {
      type: 'boolean',
      default: false,
      description: 'Is the application running in development mode',
    },
    isTest: {
      type: 'boolean',
      default: false,
      description: 'Is the application running in test mode',
    },
    isProd: {
      type: 'boolean',
      default: false,
      description: 'Is the application running in production mode',
    },
    nodeEnv: {
      type: 'string',
      enum: ['production', 'development', 'test'],
      default: 'production',
      description: 'Environment the application is running in',
    },
    port: {
      type: 'number',
      minimum: 80,
      maximum: 65535,
      default: 3000,
      description: 'Port the server listens to',
    },
    logLevel: {
      type: 'string',
      enum: ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'silent'],
      default: 'info',
      description: 'Logging level for the application',
    },
    logHttp: {
      type: 'number',
      minimum: 0,
      maximum: 1,
      default: 0,
      description: 'Enable HTTP logging',
    },
    cookieSecret: {
      type: 'string',
      minLength: 32,
      description: 'Secret key used for signing cookies',
    },
  },
};

const validate = ajValidator.compile(configSchema);

export default function getConfig(env = process.env) {
  const cnf = {
    isDev: env.NODE_ENV === 'development',
    isTest: env.NODE_ENV === 'test',
    isProd: env.NODE_ENV === 'production',
    nodeEnv: env.NODE_ENV,
    port: parseInt(env.PORT),
    logLevel: env.LOG_LEVEL,
    logHttp: parseInt(env.LOG_HTTP),
    cookieSecret: env.COOKIE_SECRET,
  };

  const result = validate(cnf);
  if (!result) {
    console.error('Config validation error', validate.errors);
    throw new Error('Config validation error');
  }
  return cnf;
}
