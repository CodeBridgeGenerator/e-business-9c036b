const assert = require('assert');
const app = require('../../src/app');

describe('\'staffinfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('staffinfo');

    assert.ok(service, 'Registered the service (staffinfo)');
  });
});
