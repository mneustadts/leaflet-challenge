var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"

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

function createMap(earthquakes) {

    // Define satelitemap and darkmap layers
    var satelitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
  
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object
    var baseMaps = {
      "Satelite Map": satelitemap,
      "Dark Map": darkmap
    };

  
    // Create overlay object 
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map
    var myMap = L.map("mapid", {
      center: [0, 0],
      zoom: 2,
      layers: [satelitemap, earthquakes]
    });
  
    // Create a layer control
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = () => {
      var div = L.DomUtil.create('div', 'info legend');
      var magnitudes = [0, 1, 2, 3, 4, 5];
  
      magnitudes.forEach(m => {
        var range = `${m} - ${m+0.25}`;
        if (m >= 5.75) {range = `${m}+`}
        var html = `<div class="legend-item">
              <div style="height: 25px; width: 25px; background-color:${getColor(m)}"> </div>
              <div class=legend-text>Magnitude:- <strong>${range}</strong></div>
          </div>`
        div.innerHTML += html
      });
      return div;
    };
    legend.addTo(myMap);
  }