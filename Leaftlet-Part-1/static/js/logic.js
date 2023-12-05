// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  console.log(data.features)
  createFeatures(data.features);
});

function markerSize(magnitude) {
  return Math.sqrt(magnitude) * 10;
}

function chooseColor(depth) {
  if ((depth >= -10) && (depth < 10)) return "lime";
  else if ((depth >= 10) && (depth < 30)) return "greenyellow";
  else if ((depth >= 30) && (depth < 50)) return "yellow";
  else if ((depth >= 50) && (depth < 70)) return "orange";
  else if ((depth >= 70) && (depth < 90)) return "orangered";
  else return "red";
}

function createFeatures(earthquakeData) {
  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
  }

  function style(feature) {
    let location = feature.geometry;

    let circle = {
      stroke: true,
      color: 'black',
      fillColor: chooseColor(location.coordinates[2]),
      weight: 0.5,
      fillOpacity: 0.5,
      radius: markerSize(feature.properties.mag)
    };
    return circle;
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: style,
    pointToLayer : function(feature,latlng){
      return L.circleMarker(latlng)
    }
  });

  // Send our earthquakes layer to the createMap function.
  createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object.
  let baseMaps = {
    'Street Map': street,
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    'Earthquakes': earthquakes,

  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });



  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depth = [-10, 10, 30, 50, 70, 90];
    let labels = [];

    depth.forEach(function (depthValue, index) {
      let label = '<li style="background-color:' + chooseColor(depthValue) + ';"></li> ' + depthValue;

      if (depth[index + 1]) {
        label += "&ndash;" + depth[index + 1] + "<br>";
      } else {
        label += "+";
      }

      labels.push(label);
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };



  // Adding the legend to the map
  legend.addTo(myMap);

}

