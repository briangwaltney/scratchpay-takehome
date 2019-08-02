## Scratch Pay takehome challenge

### Summary
This is an API that is queryable via HTTP and via Pub/Sub.
It takes a UTC date and a delay value and returns a new date
past the business days sent in the request.

### Setup
This can be run locally by first running `npm i` and then `node index.js`.
Tests can be run using `npm test`

The endpoints can be tested at `/api/v1/businessDates/`

The pubsub interface can be tested at the root.

### Comments on the build
The HTTP portion was developed using TDD. All tests were written using Mocha and Chai.
Unit tests for the date calucation function and integration tests testing the 
API endpoints are included.

I was relatively unfamiliar with building Pub/Sub interfaces and `postal`
specifically, so I used Socket.io instead. Given that I was new to this
library and application, I did not use TDD for this portion.

### Notes on test cases
The final test case appears to have an error in it.
December 25, 2018 with a delay of 20 should return January 24th with 8 weekend days
and 3 holidays.
