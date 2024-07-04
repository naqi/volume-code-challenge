import {NextRequest, NextResponse} from "next/server";
import {airportData} from "airport-data-js"
type Flight = [string, string];
type Payload = {
    flights: Flight[]
}

function errorResponse(message: string, status: number) {
    return NextResponse.json({
        message
    }, {
        status
    })
}

export async function POST(request: NextRequest){
    try {
        const body: Payload = await request.json()
        const { flights } = body
        if (!flights){
            return errorResponse( "Missing parameter `flights`", 400)
        }
        // Create a map to store the source to destination mapping
        const flightMap = new Map<string, string>();
        const destinationSet = new Set<string>();
        const sourceSet = new Set<string>();

        // Populate the flight map and track sources and destinations
        try {
            flights.forEach(([source, destination]) => {
                if (airportData.getAirportByIcao(source) && airportData.getAirportByIcao(destination)) { //This library throws an error if code is invalid ¯\_(ツ)_/¯
                    flightMap.set(source, destination);
                    sourceSet.add(source);
                    destinationSet.add(destination);
                }
            });
        } catch (ex) {
            return errorResponse(`Invalid airport code. Please check your data`, 404)
        }

        // Find the starting point (a source that is not a destination)
        let start: string | undefined;
        for (let source of sourceSet) {
            if (!destinationSet.has(source)) {
                start = source;
                break;
            }
        }

        if (!start){
            return errorResponse("Invalid flight data: no starting point found.", 404)
        }

        const result = findFlightPath(flightMap, start)
        if (!result) {
            return errorResponse("Invalid flight data, no path found", 404)
        }
        return NextResponse.json(result)

    }
    catch (error) {
        return errorResponse("Missing parameter `flights` or airport code not valid", 404)
    }
}

function findFlightPath(flightMap: Map<string, string>, start: string): (string | undefined)[] | undefined {
    // Traverse the flight map to build the complete path
    const flightPath: string[] = [];
    let path: string | undefined = start
    while (path) {
        flightPath.push(start);
        path = flightMap.get(start);
    }
    if(flightPath.length >= 2) {
        return [flightPath.shift(), flightPath.pop()];
    }
    return undefined
}