const assert = require('assert');
const app = require('../../src/app');

describe('\'superior\' service', () => {
  it('registered the service', () => {
    const service = app.service('superior');

    assert.ok(service, 'Registered the service (superior)');
  });
});
