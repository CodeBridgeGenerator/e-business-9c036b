const assert = require('assert');
const app = require('../../src/app');

describe('\'companyAddresses\' service', () => {
  it('registered the service', () => {
    const service = app.service('companyAddresses');

    assert.ok(service, 'Registered the service (companyAddresses)');
  });
});
