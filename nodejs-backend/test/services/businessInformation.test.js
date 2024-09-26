const assert = require('assert');
const app = require('../../src/app');

describe('\'businessInformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('businessInformation');

    assert.ok(service, 'Registered the service (businessInformation)');
  });
});
