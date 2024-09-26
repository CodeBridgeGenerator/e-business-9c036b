const assert = require('assert');
const app = require('../../src/app');

describe('\'trainingProviderSInformation\' service', () => {
  it('registered the service', () => {
    const service = app.service('trainingProviderSInformation');

    assert.ok(service, 'Registered the service (trainingProviderSInformation)');
  });
});
