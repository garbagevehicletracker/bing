let map, pushpin, line;
let previousPositions = [];

function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('map'), {
        center: new Microsoft.Maps.Location(0, 0),
        zoom: 10
    });

    navigator.geolocation.getCurrentPosition(initializeMap);

    // Start tracking user's location
    navigator.geolocation.watchPosition(updateLocation);
}

function initializeMap(position) {
    const loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);
    
    // Create a pushpin for the current location
    pushpin = new Microsoft.Maps.Pushpin(loc);
    map.entities.push(pushpin);

    // Center the map on the current location
    map.setView({ center: loc, zoom: 15 });

    // Add the current location to the previous positions array
    previousPositions.push(loc);

    // Create a line to connect previous positions
    line = new Microsoft.Maps.Polyline(previousPositions, {
        strokeColor: 'blue',
        strokeThickness: 3
    });
    map.entities.push(line);
}

function updateLocation(position) {
    const loc = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude);

    // Update the pushpin's location
    pushpin.setLocation(loc);

    // Center the map on the updated location
    map.setView({ center: loc });

    // Add the updated location to the previous positions array
    previousPositions.push(loc);

    // Update the line to include the new position
    line.setLocations(previousPositions);
}
