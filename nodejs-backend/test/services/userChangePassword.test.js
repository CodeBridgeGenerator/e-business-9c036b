const assert = require('assert');
const app = require('../../src/app');

describe('\'userChangePassword\' service', () => {
  it('registered the service', () => {
    const service = app.service('userChangePassword');

    assert.ok(service, 'Registered the service (userChangePassword)');
  });
});
