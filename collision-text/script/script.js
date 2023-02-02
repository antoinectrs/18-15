var map = L.map('map');
var mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
var accessToken = 'pk.eyJ1IjoiYW50b2luZTk4IiwiYSI6ImNrMXVxemtrNzBjbTczaXBhb2I3amJ5YncifQ.EqRwzHSuwtW2sp615mvCAQ';
var myTileLayer = L.tileLayer(mapboxUrl, {
    id: 'antoine98/cldix5fgm000101qqtjw6dqqr',
    attribution: '',
    maxZoom: 18,
    accessToken: accessToken
});
// myTileLayer.addTo(map);

var monRepos = L.latLng(46.52037575165908, 6.643580652428753);
map.setView(monRepos, 19);


// myTileLayer.addTo(map);
hideOverlappingTooltips();

map.on('zoomend', function (evt) {
    hideOverlappingTooltips();
});

