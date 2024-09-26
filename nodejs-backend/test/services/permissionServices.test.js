const assert = require('assert');
const app = require('../../src/app');

describe('\'permissionServices\' service', () => {
  it('registered the service', () => {
    const service = app.service('permissionServices');

    assert.ok(service, 'Registered the service (permissionServices)');
  });
});
