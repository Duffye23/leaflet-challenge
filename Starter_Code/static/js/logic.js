//Using all earthquakes in the last week
// setup the variable with our url

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Use the url to create the get request and acquire the data features
d3.json(url),then(function(data){
    //log the data you retrieve to the console
    console.log(data);
    //When the response comes in, create an object to send to the createFeatures function.
    createFeatures(data.features);
    });

//We now need 2 functions to set marker size given by magnitude and marker colour by depth
//Create a function to set the marker size
function markerSize(magnitude){
    return magnitude*1000;
}

//Create a function that colours the marker based on its depth on the map
//colour scale will go from shallow(green) to to deep(red)
function markerColour(depth){
    if (depth<20) return "#11FE09"; //green
    else if (depth<40) return "#BDFE09"; //green-yellow
    else if (depth<60) return "#FEF609"; //yellow
    else if (depth<80) return "#FEBD09"; //yellow orange
    else return "#FE0F0F"; //red
}

//Create a function that we run for each feature, and then give each feature a popup for that describes
//the location and magnitude of the earthquake. The data features are already stored in the createFeatures function
//which will be fleshed out in more detail here.
function createFeatures(eqData){
    function popupFeatures{
    layer.bindPopup(`<h3>Location:${feature.properties.place}</h3><hr><p>Date:
    ${new Date(feature.properties.time)}</p><p>Magnitude:
    ${feautre.properties.mg}</p><p>Depth:
    ${feature.geometry.coordinates[2]}</p>`);
    }
    //Create the layer that houses all the features we are making
    var eq = L.geoJSON(eqData, {
        popupFeatures: popupFeatures,
    })
}