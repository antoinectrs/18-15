
let ready = false;
let state = true;
let DATA = "notready";
let uniqueUsers;
let bounds = setUpBoundaries(500);
let filteredData;
let listener = {
    end: undefined,
    start: 0,
    userContent: "",
};
let geojson,activePoints;
//SLIDER
const markersMap = new Map();
const clustersMap = new Map();
const opt = {
    // maxClusterRadius: 100,
    maxClusterRadius: 100,
    // minClusterRadius: 10,
    // singleMarkerMode:false,
    // showCoverageOnHover:false,
    // polygonOptions:false,
    // spiderfyOnMaxZoom:false,
    spiderfyOnMaxZoom: false,
    removeOutsideVisibleBounds: true
};

var coordinates = [];

function waitJSON() {
    // Set the OSRM server URL
    const serverUrl = 'https://router.project-osrm.org';
    fetch('../data/lava_data.json')
        .then(response => response.json())
        .then(data => {
            DATA = Object.values(data.dict);
            JSONload();
        });
}
// document.querySelector("#inside").addEventListener('click', unlock);
function unlock(e) {
    if (state == true) {
        document.querySelector("#description").classList.toggle("hide");
        document.querySelector("#intro").classList.toggle("hide");
    }
}

function handleStart(e) {
    state = false;
    var x = document.getElementById("myText").value;
    if (x != "") {
        listener.userContent = JSON.stringify(x);
        // myTileLayer.addTo(map);
        const intro = document.querySelector("#intro");
        console.log(intro);
        intro.style.display = "none";
        ready = true;
    } else {
        console.log("not write");
    }
}





