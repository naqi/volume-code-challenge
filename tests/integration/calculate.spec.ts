// app/api/users.test.ts
import {expect, test} from '@playwright/test';
import {mockFourFlights, mockRandomFlights, mockSingleFlight, mockTwoFlights} from "./MockFlight";

// Don't use the default user agent to avoid the requests to be blocked by Clerk middleware.
test.use({ userAgent: '' });

test.describe('Api tests for /calculate', () => {
    test.describe('returns processed results for /calculate api request', () => {
        test('Single flight path should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/calculate', {
                data: {
                    flights: mockSingleFlight()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Two flight paths should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/calculate', {
                data: {
                    flights:mockTwoFlights()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Four flight paths should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/calculate', {
                data: {
                    flights: mockFourFlights()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Random flight paths should return 404 error' ,async ({request}) => {
            const response = await request.post('/calculate', {
                data: {
                    flights: mockRandomFlights(10)
                }
            })
            expect(response.status()).toBe(404)
        })
    })
});

test.describe('API tests for /api/calculate', () => {
    test.describe('returns processed results for /api/calculate', () => {
        test('Single flight path should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/api/calculate', {
                data: {
                    flights: mockSingleFlight()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Two flight paths should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/api/calculate', {
                data: {
                    flights: mockTwoFlights()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Four flight paths should return ["SFO", "EWR"]' ,async ({request}) => {
            const response = await request.post('/api/calculate', {
                data: {
                    flights: mockFourFlights()
                }
            })
            const responseJson = await response.json()
            expect(response.status()).toBe(200)
            expect(responseJson).toEqual(["SFO", "EWR"])
        })

        test('Random flight paths should return 404 error' ,async ({request}) => {
            const response = await request.post('/api/calculate', {
                data: {
                    flights: mockRandomFlights(10)
                }
            })
            expect(response.status()).toBe(404)
        })
    })
});