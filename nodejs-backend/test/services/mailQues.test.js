const assert = require('assert');
const app = require('../../src/app');

describe('\'mailQues\' service', () => {
  it('registered the service', () => {
    const service = app.service('mailQues');

    assert.ok(service, 'Registered the service (mailQues)');
  });
});
