const assert = require('assert');
const app = require('../../src/app');

describe('\'inbox\' service', () => {
  it('registered the service', () => {
    const service = app.service('inbox');

    assert.ok(service, 'Registered the service (inbox)');
  });
});
