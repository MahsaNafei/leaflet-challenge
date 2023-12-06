# Earthquake Visualization Dashboard

### Overview

This repository provides an interactive web visualization dashboard for earthquake data using Leaflet.js and D3.js. The visualizations include a map displaying earthquake locations and details, as well as tectonic plate boundaries. The earthquake data is dynamically fetched from the USGS Earthquake API.

### Code Structure

#### `index.html`

- The `index.html` file is the main HTML document that defines the structure of the web page. It includes placeholders for the map and legend.


#### `app.js`

- The `app.js` file is the primary JavaScript script responsible for fetching and processing earthquake data, as well as creating and updating visualizations. It utilizes Leaflet.js for map creation and D3.js for data manipulation.
- The file contains functions such as `markerSize`, `chooseColor`, `createFeatures`, and `createMap` to handle different aspects of data visualization and map rendering.


### Visualizations

#### Earthquake Map

- The earthquake map is created using Leaflet.js, with each earthquake represented by a circle marker.
- Marker size corresponds to earthquake magnitude, and marker color indicates depth.
- Popups provide information about the location, date, magnitude, and depth of each earthquake.

#### Tectonic Plates

- Tectonic plate boundaries are displayed on the map using GeoJSON data.
- Plates are outlined in orange to distinguish them from earthquake markers.

### Data Source

- Earthquake data is dynamically fetched from the USGS Earthquake API using the provided API endpoint.
- Tectonic plate boundary data is sourced from a GeoJSON file hosted on GitHub.
- [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- [Tectonic Plates GeoJSON file](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

### Instructions

1. Open the `index.html` file in a web browser.
2. Ensure an internet connection to fetch earthquake data from the USGS API.
3. Explore the interactive map, which includes earthquake markers and tectonic plate boundaries.
4. Click on earthquake markers to view detailed information in popups.
5. Use the layer control to toggle between different basemaps (Satellite, Grayscale, Outdoors) and overlays (Earthquakes, Tectonic Plates).




