const assert = require('assert');
const app = require('../../src/app');

describe('\'permissionFields\' service', () => {
  it('registered the service', () => {
    const service = app.service('permissionFields');

    assert.ok(service, 'Registered the service (permissionFields)');
  });
});
