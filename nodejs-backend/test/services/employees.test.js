const assert = require('assert');
const app = require('../../src/app');

describe('\'employees\' service', () => {
  it('registered the service', () => {
    const service = app.service('employees');

    assert.ok(service, 'Registered the service (employees)');
  });
});
