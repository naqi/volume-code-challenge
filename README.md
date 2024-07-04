## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Summary
I decided to use NextJS as my framework for this exercises. I am always looking at newer technologies and try to use them in a small project first. So far my experience with NextJS during this project has been pretty good. Thier documentation is nice, their starter templates and packs give really good insights on how it can be used in various different use cases. My next step would be to understand how they are using server side and client side annotation for thier APIs and edge functions.

### Space complexity:
I will analyze the time complexity (Big O) of this code section by section:

1. The POST function:
   - JSON parsing: O(n) where n is the size of the input
   - Creating sets and maps: O(m) where m is the number of flights
   - Finding the starting point: O(m) in the worst case
   - Calling findFlightPath: O(m) (we'll analyze this separately)

Overall, the `POST` function has a time complexity of `O(n + m)`, where n is the size of the input `JSON` and `m` is the number of flights.
2. The findFlightPath function:
   - Traversing the `flight map`: `O(m)` in the worst case, where `m` is the number of flights
   - Array operations (push, shift, pop): `O(1)` amortized
    The findFlightPath function has a time complexity of `O(m)`.

Combining these, the overall time complexity of the code is `O(n + m)`, where:

`n` is the size of the input JSON
`m` is the number of flights

In most practical cases, `m` (number of flights) will be smaller than or equal to `n` (size of input `JSON`), so we can simplify this to `O(n)`.
Space complexity:

The space complexity is also O(n + m) or simplified to O(n), as we store the flights in a map and sets.

### Tests
This project has been setup with `vitest` for e2e testing - though none were written. Integration tests have been setup through Playwright. Tests are avaialble in `tests` folder and can be run via `npm run test:e2e`

# Flight Path Calculation API
This API allows you to find the starting and ending points of a flight path given a series of connected flights.

## Endpoints

## Request
`POST /api/calculate`
### Headers
- `Content-Type: application/json`

### Body

The request body should be a JSON object with the following structure:

-  `flights: An array of flight pairs, where each pair is represented as an array of two ICAO airport codes (strings).`

Example, 
```json
{
  "flights": [
    ["JFK", "ATL"],
    ["ATL", "SFO"]
  ]
}
```

### Response
#### Success Response

```
Status Code: 200 OK
Content-Type: application/json

["JFK", "SFO"]
```
The response body will contain an array with two elements: the starting airport IATA code and the ending airport IATA code.

#### Error Responses

#### Missing Flights Parameter
```
Status Code: 400 Bad Request
Body:
{
"message": "Missing parameter `flights`"
}
```

#### No Starting Point Found
```
Status Code: 404 Bad Request
Body:
{
"message": "Invalid flight data: no starting point found."
}
```
#### No Path Found
```
Status Code: 404 Bad Request
Body:
{
"message": "Invalid flight data, no path found"
}
```
#### General Error
```
Status Code: 404 Bad Request
Body:
{
"message": "Missing parameter `flights`"
}
```
