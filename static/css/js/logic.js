var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
var platesURL = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json"

// Create color function
function getColor(magnitude) {
    if (magnitude > 5) {
        return 'red'
    } else if (magnitude > 4) {
        return 'orange'
    } else if (magnitude > 3) {
        return 'yellow'
    } else if (magnitude > 2) {
        return 'lightgreen'
    } else if (magnitude > 1) {
        return 'green'
    } else {
        return 'magenta'
    }
};

//Create radius function
function getRadius(magnitude) {
    return magnitude * 30000;
};
// Perform a GET request to the query URL
d3.json(quakeURL, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });

  function createFeatures(quakeData) {

    var earthquakes = L.geoJSON(quakeData, {
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
   onEachFeature : function (feature, layer) {
  
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.properties.mag),
          fillOpacity: 1,
          stroke: false,
      })
    }
    });

    createMap(earthquakes);
}