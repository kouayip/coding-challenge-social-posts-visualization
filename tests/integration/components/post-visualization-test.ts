import { module, test } from 'qunit';
import { setupRenderingTest } from 'coding-challenge-social-posts-visualization/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | post-visualization', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<PostVisualization @eventType="pin" />`);

    assert.dom().hasText('Number of posts processed: 0');
  });
});
