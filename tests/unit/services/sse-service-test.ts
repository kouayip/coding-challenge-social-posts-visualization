import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'coding-challenge-social-posts-visualization/tests/helpers';

module('Unit | Service | sse-service', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:sse-service');
    assert.ok(service);
  });

  test('it subscribes and triggers event', function (assert) {
    const service = this.owner.lookup('service:sse-service');

    const eventType = 'testEvent';
    let callbackCalled = false;

    const callback = (payload: unknown) => {
      assert.deepEqual(
        payload,
        { test: 'data' },
        'Callback receives correct payload',
      );
      callbackCalled = true;
    };

    run(() => {
      service.subscribe(eventType, callback);
      service.trigger(eventType, { test: 'data' });
    });

    assert.ok(callbackCalled, 'Callback was called');
  });

  test('it unsubscribes from event', function (assert) {
    const service = this.owner.lookup('service:sse-service');

    const eventType = 'testEvent';
    let callbackCalled = false;

    const callback = () => {
      callbackCalled = true;
    };

    run(() => {
      service.subscribe(eventType, callback);
      service.trigger(eventType, {});
      service.unsubscribe(eventType, callback);
    });

    assert.ok(callbackCalled, 'Callback was called before unsubscribing');

    callbackCalled = false;

    run(() => {
      service.trigger(eventType, {});
    });

    assert.notOk(callbackCalled, 'Callback was not called after unsubscribing');
  });

  test('it handles SSE message', function (assert) {
    const service = this.owner.lookup('service:sse-service');

    const eventType = 'testEvent';
    let callbackCalled = false;
    const callback = (payload: unknown) => {
      assert.deepEqual(
        payload,
        { test: 'data' },
        'Callback receives correct payload',
      );
      callbackCalled = true;
    };

    run(() => {
      service.subscribe(eventType, callback);
      service.handleMessage({
        data: JSON.stringify({ [eventType]: { test: 'data' } }),
      } as MessageEvent);
    });

    assert.ok(callbackCalled, 'Callback was called');
  });

  test('it closes EventSource on destroy', function (assert) {
    let eventSourceClosed = false;

    // Mock EventSource
    const EventSourceMock = function () {
      return {
        close: function () {
          eventSourceClosed = true;
        },
      };
    };

    // Replace the global EventSource with our mock
    type EventSource = typeof window.EventSource;
    window.EventSource = EventSourceMock as unknown as EventSource;

    const service = this.owner.lookup('service:sse-service');

    run(() => {
      service.willDestroy();
    });

    assert.ok(eventSourceClosed, 'EventSource was closed on destroy');
  });
});
