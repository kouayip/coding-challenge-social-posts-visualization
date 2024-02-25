# Coding Challenge Social Posts Visualization

## Introduction

This front-end application provides a user-friendly way to visualize social media posts based on the day of the week, hour of the day, and the volume of posts. It fetches real-time data from the Upfluence API endpoint using Server-Sent Events (SSE) technology and updates the visualization accordingly.

## Solution Description

The application is crafted using Ember.js as the front-end framework, providing a robust and scalable foundation for managing the user interface components. The PostVisualization component utilizes Chart.js to visualize the real-time social media post data in a punch card format, offering users an intuitive and insightful way to observe posting patterns.

The SseService, a custom Ember.js service, is dedicated to handling the Server-Sent Events (SSE) connection to the streaming server. This service efficiently manages the communication between the client-side application and the server, ensuring a seamless flow of real-time data updates.

## Technical Choices

-  Ember.js: Chosen for its powerful framework capabilities, facilitating the organization and management of components in a clear and maintainable structure.

- Punch Card Visualization with Chart.js: The PunchCardChart component leverages Chart.js to create the punch card visualizations. Chart.js offers a simple yet powerful library for generating interactive and visually appealing charts, providing a high level of customization for the punch card display.

- SseService: This custom service abstracts the complexities of SSE communication, providing a clean and reusable interface for subscribing to and handling incoming events. It ensures that the application receives real-time updates efficiently and updates the visualizations accordingly.

- Environment Configuration: The application utilizes Ember's ENV configuration for managing the URL of the streaming server. This allows for easy configuration changes without the need to modify code directly.

## Trade-offs and future improvements

Although the current implementation meets the functional requirements, there are trade-offs and areas for improvement:

1. Single Stream Endpoint: The application currently connects to a single SSE endpoint for all types of social media posts. This design simplifies the implementation but might not be optimal for scalability if the number of post types or sources increases significantly.
2. Simplicity vs Customization: The choice of using Chart.js for the punch card visualization offered simplicity and ease of implementation. However, it might limit the level of customization compared to more low-level libraries like D3.js. This trade-off was made for quicker development time and easier maintenance.
3. Testing Coverage: While comprehensive unit tests were implemented for the SseService, there might be areas where additional testing could improve robustness, such as edge cases or error handling scenarios.
4. Improved design: Improvements to the overall design and user interface could make the application more attractive and intuitive.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd coding-challenge-social-posts-visualization`
- `npm install`

## Running / Development

- `npm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `npm run test`
- `npm run test:ember -- --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm exec ember build` (development)
- `npm run build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Additional Notes

The application is designed to be responsive and should work well on various screen sizes.

#### Code Consistency and Standards:
The codebase adheres to Ember.js and TypeScript coding standards for consistency and readability. This ensures that developers can easily understand and contribute to the project.
