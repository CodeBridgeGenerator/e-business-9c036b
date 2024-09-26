const assert = require('assert');
const app = require('../../src/app');

describe('\'userInvites\' service', () => {
  it('registered the service', () => {
    const service = app.service('userInvites');

    assert.ok(service, 'Registered the service (userInvites)');
  });
});
