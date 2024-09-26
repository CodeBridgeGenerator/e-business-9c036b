const assert = require('assert');
const app = require('../../src/app');

describe('\'companies\' service', () => {
  it('registered the service', () => {
    const service = app.service('companies');

    assert.ok(service, 'Registered the service (companies)');
  });
});
