// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {

    const styles = {
        default: [],
        hide: [
            {
                featureType: "poi",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi.medical",
                stylers: [{ visibility: "on" }],
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
        ],
    };


    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 13,
        styles: styles["hide"]
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    // The marker, positioned at user

                    const marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                    });
                    infoWindow.setContent("You are Here");
                    infoWindow.open(map);
                    map.setCenter(pos);

                    
                    var request = {
                        location: pos,
                        radius: '5000',
                        type: ['hospital']
                    };
                    

                    google.service = new google.maps.places.PlacesService(map);
                    google.service.nearbySearch(request, callback);


                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
    }

 
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
function createMarker(place) {

    new google.maps.Marker({
        position: place.geometry.location,
        map: map
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            infoWindow.setContent("Medical");
        }
    }
}

window.initMap = initMap;
console.log("initialize Java");