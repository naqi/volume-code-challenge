import {NextRequest, NextResponse} from "next/server";
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
        flights.forEach(([source, destination]) => {
            flightMap.set(source, destination);
            sourceSet.add(source);
            destinationSet.add(destination);
        });

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
        return errorResponse("Missing parameter `flights`", 404)
    }
}

function findFlightPath(flightMap: Map<string, string>, start: string): (string | undefined)[] | undefined {
    // Traverse the flight map to build the complete path
    const flightPath: string[] = [];
    let path: string | undefined = start
    while (path) {
        flightPath.push(path);
        path = flightMap.get(path);
    }
    if(flightPath.length >= 2) {
        return [flightPath.shift(), flightPath.pop()];
    }
    return undefined
}