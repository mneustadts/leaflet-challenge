var myMap = L.map("mapid", {
  center: [0, 0],
  zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox.satelite",
  accessToken: API_KEY
  }).addTo(myMap)
  
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

//perform api call
d3.json(quakeURL).then(function(data) {

  L.geoJson(data).addTo(myMap);
});
