const assert = require('assert');
const app = require('../../src/app');

describe('\'errors\' service', () => {
  it('registered the service', () => {
    const service = app.service('errors');

    assert.ok(service, 'Registered the service (errors)');
  });
});
