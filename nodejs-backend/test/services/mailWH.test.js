const assert = require('assert');
const app = require('../../src/app');

describe('\'mailWH\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailWH');

    assert.ok(service, 'Registered the service (mailWH)');
  });
});
