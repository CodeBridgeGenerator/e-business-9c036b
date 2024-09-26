const assert = require('assert');
const app = require('../../src/app');

describe('\'departments\' service', () => {
  it('registered the service', () => {
    const service = app.service('departments');

    assert.ok(service, 'Registered the service (departments)');
  });
});
