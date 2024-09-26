const assert = require('assert');
const app = require('../../src/app');

describe('\'branches\' service', () => {
  it('registered the service', () => {
    const service = app.service('branches');

    assert.ok(service, 'Registered the service (branches)');
  });
});
