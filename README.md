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
