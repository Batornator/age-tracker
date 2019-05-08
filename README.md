A small app developed to run with portable nodejs on a device with restricted access to install apps.

This app reads & writes a csv file containing name/ date of birth information in order to calculate an age in Years and Months. Written to aid in the marking of test papers which standardise scores based on age.

### Running the app

#### Configuration

A .env.sample file is included. Simply copy (or rename) this to .env and populate the appropriate values.

REACT_APP_SERVER_URL - The url and port on which the API will be hosted.
PORT - The port on which you want the node API to run.

#### Starting the process
Dev - 2 terminals are required. In 1 run `npm start` and the other `node server`

Live - Once the react app is built (npm run-script build). `node server ` will spin up the backend and host the frontend on http://localhost:1337

As this is intended to run on a device without installing anything there are no external dependencies other than those in the package.json.

#### Docker

If you prefer you can use Docker. A Dockerfile is included in the repo which builds & hosts the app on port 1337 (this cna be changed in the Dockerfile and .env respectively).

Just build the Docker image and then run it. Then open up http://localhost:1337 or your configured host and port

### Roadmap

Future plans include having a solution built on a secure hosted database, login, session management etc.

Move away from the use of the async module (https://github.com/caolan/async) and use native es6 promises/async/await.

Unit testing for both front and backend.