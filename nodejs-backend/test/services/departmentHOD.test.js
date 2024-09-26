const assert = require('assert');
const app = require('../../src/app');

describe('\'departmentHOD\' service', () => {
  it('registered the service', () => {
    const service = app.service('departmentHOD');

    assert.ok(service, 'Registered the service (departmentHOD)');
  });
});
