const assert = require('assert');
const app = require('../../src/app');

describe('\'dynaLoader\' service', () => {
  it('registered the service', () => {
    const service = app.service('dynaLoader');

    assert.ok(service, 'Registered the service (dynaLoader)');
  });
});
