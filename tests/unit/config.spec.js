import { test } from '@japa/runner';

import getConfig from '../../src/config.js';

test.group('Configuration tests', () => {
  test('cnf properties and values', ({ expect }) => {
    const cnf = getConfig({
      NODE_ENV: 'test',
      PORT: 4000,
      LOG_LEVEL: 'silent',
      LOG_HTTP: 0,
      COOKIE_SECRET: 'abcdefghijklmnopqrstuvwxyz1234567890',
    });
    // expect(cnf).toHaveKeys(['nodeEnv', 'port', 'logLevel', 'logHttp']);
    expect(cnf).toHaveProperty('isDev', false);
    expect(cnf).toHaveProperty('isProd', false);
    expect(cnf).toHaveProperty('isTest', true);
    expect(cnf).toHaveProperty('nodeEnv', 'test');
    expect(cnf).toHaveProperty('port', 4000);
    expect(cnf).toHaveProperty('logLevel', 'silent');
    expect(cnf).toHaveProperty('logHttp', 0);
    expect(cnf).toHaveProperty('cookieSecret', 'abcdefghijklmnopqrstuvwxyz1234567890');
  });
});
