const assert = require('assert');
const app = require('../../src/app');

describe('\'trainerDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainerDetails');

    assert.ok(service, 'Registered the service (trainerDetails)');
  });
});
