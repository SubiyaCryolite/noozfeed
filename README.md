# NoozFeed - Demo News Aggregator

Created using [React 19](https://react.dev/) and [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).

Scaffolded and developed against [Vite](https://vitejs.dev/guide/)

Submitted by [Ifunga Ndana](https://github.com/SubiyaCryolite)

# Building the project: Docker

- Be sure to be in the projects root directory.
- Run `docker build -t noozfeed .`

# Running the project: Docker

- First, ensure no other services are listening on port 8080
- Run `docker run -it --rm -d -p 8080:80 --name take-home-ifunga noozfeed`
- Navigate to [http://localhost:8080](http://localhost:8080)
- Open in your browser of choice, enjoy

# Closing the project: Docker

SImply run `docker stop take-home-ifunga`

# Running the project: Locally

- Open this project from the root directory
- Run `npm install` at least once
- Run `npm run dev`, this will load the demo at [http://localhost:9000](http://localhost:9000) by default

# Design

- The project relies on Local Storage for persistence
- All endpoints support date range and query filtering
- Data sources can be enabled or disabled by clicking on the gear icon
- Only 3 data sources configured, though as demonstrated through the implementation in more could be easily
  - Only NYT supports filtering by category/section
  - Only NYT support filtering by publication
- Responsive design was tested in browser emulation

# Constraints

- No Jest unit tests were added due to time constraints
  - Thats said the use of Contexts and Hooks would make mocking and verifying behaviour and edge cases smooth
- Client side filtering and sorting could be implemented via Tanstack Table. Not done due to time constraints
- The News API is throttled daily, so any errors may be as a result of that.

# known Issues

- Date Pickers do not position correctly in FireFox. Leaving as is due to time constraints
- Chrome device emulation seems broken, however page loads as expected in Mozilla device emulation
