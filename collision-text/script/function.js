
function foldData(){
    filteredData = DATA.filter(d => bounds.contains(d.latlng));
    uniqueUsers = getUniqueUsers(filteredData);
     filteredUsers = uniqueUsers.map(filterUser);
    activePoints = turf.featureCollection([]);
    // console.log(uniqueUsers);
}
function JSONload() {
    filteredUsers.forEach((user, index) => {
        if (user.length > 1 && uniqueUsers[index] !== "") {
            user.forEach(data => {
                // Extract the latlng value from the data object
                const latlng = data.latlng;
                // const point = turf.point([latlng.lng, latlng.lat], { "user": index + 1, "time": data.time });
                const point = turf.point([latlng.lng, latlng.lat], { "id":index,"user": data.user.replace(/\"/g, ""), "time": data.time });
                activePoints.features.push(point);
            });
        }
    });

    
    turf.featureEach(activePoints, function (currentFeature, featureIndex) {
        currentFeature.id = featureIndex;
    });
    geojson = L.geoJson(activePoints, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: L.divIcon({
                    className: "",
                })
            });
        },
        onEachFeature: onEachFeature,
        onEachLayer: onEachFeature
    }).addTo(map);
   
    // console.log(geojson);
    hideOverlappingTooltips();
    toolBand= document.querySelectorAll('.myTooltip');
    // $(".myTooltip").click(function() {
    //     const target = this.classList[1];
    //     const groupElements = $("." + target);
    //     if (groupElements.hasClass("hidden")) {
    //         groupElements.removeClass("hidden");
    //     } else {
    //         groupElements.addClass("hidden");
    //     }
    // });
   
    let target ;
    $(".myTooltip").click(function() {
         target = this.classList[1];
        $('.myTooltip').not('.' + target).css("opacity", "0.1");
        $('.' + target).css("opacity", "1");
    });
    
    $("#map").on("click", function(event) {
        if (event.target.className !== "myTooltip") {
            if(target==undefined){
                $('.myTooltip').not('.' + target).css("opacity", "1");
                // $('.' + target).css("opacity", "1");
            }
            target = undefined;
        }
    });
    
    
  
}

function setUpBoundaries(dist) {
    const center = L.latLng(46.52045, 6.6439);
    // Convert 1000 meters to degrees of latitude and longitude
    const latMetersPerDegree = 111319.5; // Approximation at the equator
    const lngMetersPerDegree = latMetersPerDegree * Math.cos(center.lat * Math.PI / 180);
    const halfSideLength = dist / 2;
    const halfSideInLat = halfSideLength / latMetersPerDegree;
    const halfSideInLng = halfSideLength / lngMetersPerDegree;
    // Define the bounds object with the calculated coordinates
    const bounds = L.latLngBounds(
        L.latLng(center.lat - halfSideInLat, center.lng - halfSideInLng),
        L.latLng(center.lat + halfSideInLat, center.lng + halfSideInLng)
    );
    // Add a rectangle to the map to visualize the bounds
    // L.rectangle(bounds, {
    //     fillColor: '#ffffff',
    //     fillOpacity: 1
    // }).addTo(map);
    return bounds
}

function filterUser(content) {
    const val = filteredData
        // .filter(obj => obj.user === '"il y a des petits bateaux qui flottent sur l’eau "')
        .filter(obj => obj.user === content)
        .map(obj => obj);
    return val
}
function getUniqueUsers(obj) {
    const uniqueUsers = [];
    for (const prop in obj) {
        const user = obj[prop].user;
        if (!uniqueUsers.includes(user)) {
            uniqueUsers.push(user);
        }
    }
    return uniqueUsers;
}
function updateMarkerVisibility(hours, minutes) {
    let currentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    turf.featureEach(activePoints, function (feature) {
        if (feature.properties.time >= currentTime) {
            let markersToHide = document.getElementsByClassName(feature.properties.time);
            for (let marker of markersToHide) {
                marker.style.opacity = 0.1;
            }
        } else {
            let markersToShow = document.getElementsByClassName(feature.properties.time);
            for (let marker of markersToShow) {
                marker.style.opacity = 1;
            }
        }

    });
}
function overlap(rect1, rect2) {
    return (!(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom));
}

function hideOverlappingTooltips() {
    var rects = [];
    var tooltips = document.getElementsByClassName('myTooltip');
    for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].style.visibility = '';
        rects[i] = tooltips[i].getBoundingClientRect();
    }
    for (var i = 0; i < tooltips.length; i++) {
        if (tooltips[i].style.visibility != 'hidden') {
            for (var j = i + 1; j < tooltips.length; j++) {
                if (overlap(rects[i], rects[j])) tooltips[j].style.visibility = 'hidden';
            }
        }
    }
}

function onEachFeature(feature, layer) {
    const toName = feature.properties.id +" "+ feature.properties.time.toString() + " myTooltip hide-o ";
    layer.bindTooltip(feature.properties.user.toString(), {
        permanent: true,
        className: toName,
    });
}

