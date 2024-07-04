This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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


# Flight Path API
This API allows you to find the starting and ending points of a flight path given a series of connected flights.

## Endpoints

## Request
`POST /api/calculate`
### Headers
- `Content-Type: application/json`

### Body

The request body should be a JSON object with the following structure:

`flights`: An array of flight pairs, where each pair is represented as an array of two ICAO airport codes (strings).

Example, 
```json
{
  "flights": [
    ["JFK", "ATL"],
    ["ATL", "SFO"],
    ...
  ]
}
```

### Response
#### Success Response

```
Status Code: 200 OK
Content-Type: application/json

["JFK", "ATL"]
```
The response body will contain an array with two elements: the starting airport IATA code and the ending airport IATA code.

#### Error Responses

#### Missing Flights Parameter
```
Status Code: 400 Bad Request
Body:
```
```json
{
"message": "Missing parameter `flights`"
}
```

#### No Starting Point Found
```

Status Code: 404 Not Found
Body:
```
```json
{
"message": "Invalid flight data: no starting point found."
}
```
#### No Path Found
```
Status Code: 404 Not Found
Body:
```

```json
{
"message": "Invalid flight data, no path found"
}
```
#### General Error
```
Status Code: 404 Not Found
Body:
```
```json
{
"message": "Missing parameter `flights`"
}
```
