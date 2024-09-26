const assert = require('assert');
const app = require('../../src/app');

describe('\'userLogin\' service', () => {
  it('registered the service', () => {
    const service = app.service('userLogin');

    assert.ok(service, 'Registered the service (userLogin)');
  });
});
