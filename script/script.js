
var map = L.map('map');

// var point = turf.point([46.52037575165908, 6.643580652428753]);
// var point2 = turf.point([46.520, 6.63]);
// var points = turf.featureCollection([point, point2]);

// turf.featureEach(points, function (currentFeature, featureIndex) {
//     currentFeature.id = featureIndex;
// });
// var geojson = L.geoJson(points, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {
//             icon: L.divIcon({
//                 className: 'myMarker',

//             })
//         });
//     },
//     onEachFeature: onEachFeature
// }).addTo(map);
// var geojson = L.geoJson(points, {
//     onEachFeature: onEachFeature
// }).addTo(map);



// map.fitBounds(geojson.getBounds());

let monRepos = L.latLng(46.52037575165908, 6.643580652428753);
map.setView(monRepos, 19);
// map.setView(geojson.getBounds().getCenter(), 10);

hideOverlappingTooltips();

map.on('zoomend', function (evt) {
    hideOverlappingTooltips();
});

