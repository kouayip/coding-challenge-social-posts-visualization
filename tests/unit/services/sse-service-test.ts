import { module, test } from 'qunit';
import { setupTest } from 'coding-challenge-social-posts-visualization/tests/helpers';

module('Unit | Service | sse-service', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const service = this.owner.lookup('service:sse-service');
    assert.ok(service);
  });
});
