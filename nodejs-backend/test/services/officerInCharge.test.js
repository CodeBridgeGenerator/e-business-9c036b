const assert = require('assert');
const app = require('../../src/app');

describe('\'officerInCharge\' service', () => {
  it('registered the service', () => {
    const service = app.service('officerInCharge');

    assert.ok(service, 'Registered the service (officerInCharge)');
  });
});
