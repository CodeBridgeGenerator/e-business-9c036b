const assert = require('assert');
const app = require('../../src/app');

describe('\'deployJobs\' service', () => {
  it('registered the service', () => {
    const service = app.service('deployJobs');

    assert.ok(service, 'Registered the service (deployJobs)');
  });
});
