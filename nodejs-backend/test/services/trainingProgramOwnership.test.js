const assert = require('assert');
const app = require('../../src/app');

describe('\'trainingProgramOwnership\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainingProgramOwnership');

    assert.ok(service, 'Registered the service (trainingProgramOwnership)');
  });
});
