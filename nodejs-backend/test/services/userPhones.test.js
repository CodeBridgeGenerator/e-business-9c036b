const assert = require('assert');
const app = require('../../src/app');

describe('\'userPhones\' service', () => {
  it('registered the service', () => {
    const service = app.service('userPhones');

    assert.ok(service, 'Registered the service (userPhones)');
  });
});
