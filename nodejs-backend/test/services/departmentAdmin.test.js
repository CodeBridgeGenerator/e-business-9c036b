const assert = require('assert');
const app = require('../../src/app');

describe('\'departmentAdmin\' service', () => {
  it('registered the service', () => {
    const service = app.service('departmentAdmin');

    assert.ok(service, 'Registered the service (departmentAdmin)');
  });
});
