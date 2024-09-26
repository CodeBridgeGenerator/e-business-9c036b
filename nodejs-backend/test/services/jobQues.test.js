const assert = require('assert');
const app = require('../../src/app');

describe('\'jobQues\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobQues');

    assert.ok(service, 'Registered the service (jobQues)');
  });
});
