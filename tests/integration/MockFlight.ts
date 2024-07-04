export const mockSingleFlight = () => {
    return [["SFO", "EWR"]]
}

export const mockTwoFlights = () => {
    return [
        ["ATL", "EWR"],
        ["SFO", "ATL"]
    ]
}

export const mockFourFlights = () => {
    return [
        ["IND", "EWR"],
        ["SFO", "ATL"],
        ["GSO", "IND"],
        ["ATL", "GSO"]
    ]
}

export const mockRandomFlights = ( count: number) => {
    return generateFlightData(count)
}

function randomAirportCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
}

function generateFlightData(numFlights: number): [string, string][] {
    const flights: [string, string][] = [];
    for (let i = 0; i < numFlights; i++) {
        let source = randomAirportCode();
        let destination = randomAirportCode();
        while (source === destination) {
            destination = randomAirportCode();
        }
        flights.push([source, destination]);
    }
    return flights;
}