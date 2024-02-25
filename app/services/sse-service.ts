import Service from '@ember/service';
import Evented from '@ember/object/evented';
import ENV from '../config/environment';

type CallbackFunction<T> = (data: T) => void;

/**
 * Server-Sent Events (SSE) connection management service
 * Allows you to subscribe and unsubscribe to different types of SSE events.
 */
export default class SseServiceService extends Service.extend(Evented) {
  private eventSource: EventSource | null = null;

  constructor() {
    super();

    const streamServerUrl = ENV.APP.POST_STREAM_URL;

    // Check that the URL of the streaming server exists
    if (!streamServerUrl) {
      throw new Error('STREAM_SERVER is not defined in environment');
    }

    // Creation of the EventSource for the SSE connection
    this.eventSource = new EventSource(streamServerUrl);

    // Event handler called when the connection is opened
    this.eventSource.onopen = (event) => {
      this.trigger('open', event);
    };

    // Event handler definition for received messages
    this.eventSource.onmessage = (event) => {
      this.handleMessage(event);
    };

    // Error handler definition for the EventSource
    this.eventSource.onerror = (event) => {
      console.error('SSE Error:', event);

      // Check if the connection is closed
      if (event.eventPhase === EventSource.CLOSED) {
        this.trigger('close', event);
      } else {
        this.trigger('error', event);
      }
    };
  }

  /**
   * Function for managing messages received via SSE
   * @param event The MessageEvent containing the data
   */
  handleMessage(event: MessageEvent): void {
    let data = event.data;

    try {
      data = JSON.parse(data) as unknown;
    } catch (err) {
      this.trigger('error', err);
    }

    if (typeof data === 'object') {
      // Event type retrieval from object keys
      const eventType = Object.keys(data)[0];

      // Issue the corresponding event with the appropriate data
      this.trigger(`${eventType}`, data[eventType!]);
    }

    // Send the event in the default channel
    this.trigger('message', data);
  }

  /**
   * How to subscribe to a type of SSE event
   * @param eventType eventType The type of SSE event to subscribe to.
   * @param callback The callback to execute when the event is received
   */
  subscribe<T = unknown>(eventType: string, callback: CallbackFunction<T>) {
    this.on(eventType, callback);
  }

  /**
   * How to unsubscribe from a type of HSE event
   * @param eventType The type of SSE event to unsubscribe to.
   * @param callback The callback to remove from the list of subscribers
   */
  unsubscribe<T = unknown>(eventType: string, callback: CallbackFunction<T>) {
    this.off(eventType, callback);
  }

  /**
   * Clean up of resources on service destruction
   * Closing the EventSource
   */
  willDestroy() {
    if (this.eventSource) {
      this.eventSource.close();
    }
    super.willDestroy();
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:sse-service')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('sse-service') declare altName: SseServiceService;`.
declare module '@ember/service' {
  interface Registry {
    'sse-service': SseServiceService;
  }
}
