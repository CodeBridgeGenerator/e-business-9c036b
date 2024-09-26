const assert = require('assert');
const app = require('../../src/app');

describe('\'mails\' service', () => {
  it('registered the service', () => {
    const service = app.service('mails');

    assert.ok(service, 'Registered the service (mails)');
  });
});
