import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { Chart, type ChartConfiguration } from 'chart.js/auto';
import type SseServiceService from '../services/sse-service';
import type { PostDataPoint, PostPayload } from '../types/post';

interface Args {
  eventType: string;
}

export default class PostVisualizationComponent extends Component<Args> {
  @service declare sseService: SseServiceService;
  @tracked postCount = 0;

  chartInstance: Chart | null = null;
  postDataPoint: PostDataPoint[] = [];

  setupChart(element: HTMLCanvasElement) {
    const ctx = element.getContext('2d');
    const data = this.postDataPoint;

    if (!ctx) throw new Error('Canvas context is required');

    // Labels for the days of the week on the Y axis of the graph.
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Time of day labels for the X axis of the graph.
    const times = [
      '12am',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12pm',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
    ];

    // config punch card chart
    const config: ChartConfiguration<'bubble'> = {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: this.args.eventType,
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        aspectRatio: 2,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            offset: true,
            min: 0,
            max: 23,
            ticks: {
              stepSize: 1,
              callback: (value) => {
                return times[value as number];
              },
            },
            grid: {
              display: false, // Hide the Y axis grid
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            offset: true,
            min: 0,
            max: 7,
            ticks: {
              callback: (value) => {
                return days[value as number];
              },
            },
            grid: {
              display: false, // Hide the Y axis grid
            },
          },
        },
      },
    };

    this.chartInstance = new Chart(ctx, config);
  }

  updateChart() {
    if (this.chartInstance) {
      this.chartInstance.data.datasets[0]!.data = this.postDataPoint;
      this.chartInstance.update();
    }
  }

  updateData(newData: PostPayload) {
    // Converts the timestamp into a Date object
    const timestamp = new Date(newData.timestamp * 1000);

    // Gets the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = timestamp.getUTCDay();

    // Gets the time of day (0-23)
    const hourOfDay = timestamp.getUTCHours();

    // Creates a new data point with the time, day and an initial counter of 1
    const newDataPoint: PostDataPoint = { x: hourOfDay, y: dayOfWeek, r: 1 };

    // Find out if the data point already exists
    const existingEntryIndex = this.postDataPoint.findIndex(
      (entry) => entry.x === newDataPoint.x && entry.y === newDataPoint.y,
    );

    // If the data point already exists, increment the counter
    if (existingEntryIndex !== -1) {
      this.postDataPoint[existingEntryIndex]!.r += 1;
    } else {
      // Otherwise, add the new data point
      this.postDataPoint.push(newDataPoint);
    }
  }

  updatePostCount() {
    this.postCount++;
  }

  /**
   * When a new message is received, increments the publication counter,
   * update post data and update the data graph
   */
  onUpdate = (payload: PostPayload) => {
    this.updatePostCount();
    this.updateData(payload);
    this.updateChart();
  };

  subscribeToSSE() {
    // Subscribes an observable to listen to messages from the specified social event
    this.sseService.subscribe<PostPayload>(this.args.eventType, this.onUpdate);
  }

  @action
  didInsert(element: HTMLCanvasElement) {
    this.setupChart(element);
    this.subscribeToSSE();
  }

  willDestroy(): void {
    super.willDestroy();

    // unsubscribe the observable subscription when the component is dismantled
    this.sseService.unsubscribe(this.args.eventType, this.onUpdate);

    if (this.chartInstance) {
      // destroy chart instance
      this.chartInstance.destroy();
    }
  }
}
