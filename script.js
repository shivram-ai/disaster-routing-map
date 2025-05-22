let map;
let directionsService;
let directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 },
    zoom: 10,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Flooded road markers
  markFloodedRoads();
}

function calculateRoute() {
  const source = document.getElementById("source").value;
  const destination = document.getElementById("destination").value;

  if (!source || !destination) {
    alert("Please enter both source and destination");
    return;
  }

  const request = {
    origin: source,
    destination: destination,
    travelMode: 'DRIVING',
  };

  directionsService.route(request, (result, status) => {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    } else {
      console.error("Directions request failed: " + status);
      alert("Could not find a route.");
    }
  });
}

function markFloodedRoads() {
  const floodedPaths = [
    [
      { lat: 28.6200, lng: 77.2100 },
      { lat: 28.6300, lng: 77.2150 }
    ],
    [
      { lat: 28.6400, lng: 77.2000 },
      { lat: 28.6450, lng: 77.2050 }
    ]
  ];

  floodedPaths.forEach(path => {
    new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 4,
      map: map,
    });
  });
}
