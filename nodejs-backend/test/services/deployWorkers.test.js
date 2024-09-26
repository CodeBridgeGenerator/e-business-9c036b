const assert = require('assert');
const app = require('../../src/app');

describe('\'deployWorkers\' service', () => {
  it('registered the service', () => {
    const service = app.service('deployWorkers');

    assert.ok(service, 'Registered the service (deployWorkers)');
  });
});
