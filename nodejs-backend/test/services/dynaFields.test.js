const assert = require('assert');
const app = require('../../src/app');

describe('\'dynaFields\' service', () => {
  it('registered the service', () => {
    const service = app.service('dynaFields');

    assert.ok(service, 'Registered the service (dynaFields)');
  });
});
