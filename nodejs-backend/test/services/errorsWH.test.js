const assert = require('assert');
const app = require('../../src/app');

describe('\'errorsWH\' service', () => {
  it('registered the service', () => {
    const service = app.service('errorsWH');

    assert.ok(service, 'Registered the service (errorsWH)');
  });
});
