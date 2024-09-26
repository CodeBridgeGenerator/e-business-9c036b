const assert = require('assert');
const app = require('../../src/app');

describe('\'documents\' service', () => {
  it('registered the service', () => {
    const service = app.service('documents');

    assert.ok(service, 'Registered the service (documents)');
  });
});
