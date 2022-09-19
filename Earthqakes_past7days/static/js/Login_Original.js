// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
   
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);



// Accessing the airport GeoJSON URL
//let airportData = "https://raw.githubusercontent.com/puettdoug/Mapping_Earthquakes/main/majorAirports.json";
//let torontoData = "https://raw.githubusercontent.com/puettdoug/Mapping_Earthquakes/main/torontoRoutes.json";
let torontoHoods = "https://raw.githubusercontent.com/puettdoug/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
//d3.json(airportData).then(function(data) {
    console.log(data);

// Create a style for the lines.
let myStyle = {
    fillColor: "#ffffa1",
    fillOpacity: 0.3,
    weight: 1,
    color: 'blue'
    


  // Creating a GeoJSON layer with the retrieved data.
 //L.geoJSON(data).addTo(map);
//});

}
L.geoJson(data,{
     style: myStyle,
    onEachFeature: function(feature, layer) {
    // console.log(layer);
      layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME +
      "</h3>");

      //<hr><p> Destination: " + feature.properties.AREA_NAME + "</p>");
    }    
   }).addTo(map);
});