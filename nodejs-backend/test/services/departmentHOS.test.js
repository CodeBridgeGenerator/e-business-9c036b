const assert = require('assert');
const app = require('../../src/app');

describe('\'departmentHOS\' service', () => {
  it('registered the service', () => {
    const service = app.service('departmentHOS');

    assert.ok(service, 'Registered the service (departmentHOS)');
  });
});
