import type { BubbleDataPoint } from 'chart.js';

export interface PostPayload {
  /**
   * Date of the post encoded as a UNIX timestamp
   */
  timestamp: number;
}

export interface PostDataPoint extends BubbleDataPoint {
  /**
   * Day of the week, represented by a number on the x-axis.
   * ex: 0: Sunday, 1: Monday, ..., 6: Saturday.
   */
  x: number;

  /**
   * Time of day, represented by a number on the y-axis.
   * values from 0 to 23, representing the hours from 0h to 23h.
   */
  y: number; // Hour of the day

  /**
   * Radius of on the value corresponds to the number of publications corresponding to the other two dimensions
   */
  r: number;
}
