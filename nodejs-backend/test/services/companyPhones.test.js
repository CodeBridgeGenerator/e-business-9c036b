const assert = require('assert');
const app = require('../../src/app');

describe('\'companyPhones\' service', () => {
  it('registered the service', () => {
    const service = app.service('companyPhones');

    assert.ok(service, 'Registered the service (companyPhones)');
  });
});
