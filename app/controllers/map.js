var args = arguments[0] || {};

var radius = 10;
showMap();

function goHome(e) {
	$.map.close();
}

Ti.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		alert('Get current position' + e.error);
	} else {
		Ti.API.info(JSON.stringify(e.coords));
	}
});

if (Ti.Geolocation.locationServicesEnabled) {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
	Ti.Geolocation.distanceFilter = 10;
	Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;

	Ti.Geolocation.addEventListener('location', function(e) {
		if (e.error) {
			alert('Add eventlistener!' + e.error);
		} else {
			Ti.API.info(JSON.stringify(e.coords));
			getPosition(e.coords);
		}
	});
} else {
	alert('Tillåt gpsen, tack');
}

function getPosition(coordinatesObj) {
	gLat = coordinatesObj.latitude;
	$.lblLat.text = gLat;

	gLon = coordinatesObj.longitude;
	$.lblLong.text = gLon;

	isNearPoint();
};

function distanceInM(lat1, lon1, GLat, GLon) {

	if (lat1 == null || lon1 == null || GLat == null || GLat == null) {
		alert("Det finns inga koordinater att titta efter");
	}

	var R = 6371;
	var a = 0.5 - Math.cos((GLat - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(GLat * Math.PI / 180) * (1 - Math.cos((GLon - lon1) * Math.PI / 180)) / 2;
	var distance = (R * 2 * Math.asin(Math.sqrt(a))) * 1000;

	return distance;

}

function isInsideRadius(lat1, lon1, rad) {
	var isInside = false;
	var distance = distanceInM(lat1, lon1, gLat, gLon);

	if (distance <= rad) {
		isInside = true;
	}
	return isInside;
}

function isNearPoint() {

	var coordCollection = Alloy.Collections.coordinates;
	coordCollection.fetch();

	var jsonCollection = coordCollection.toJSON();

	for (var i = 0; i < jsonCollection.length; i++) {
		var lat = jsonCollection[i].latitude;
		var lon = jsonCollection[i].longitude;

		if (isInsideRadius(lat, lon, radius)) {
			alert("Du är framme nu!");
		}
	}

}

function showMap() {
	try {
		var MapModule = require('ti.map');

		var map3 = MapModule.createView({
			userLocation : true,
			mapType : MapModule.SATELLITE_TYPE,
			animate : true,
			region : {
				latitude : 58.893539,
				longitude : 11.012579,
				latitudeDelta : 0.1,
				longitudeDelta : 0.1
			},
			height : '90%',
			width : Ti.UI.FILL
		});

		var markers = Alloy.Collections.hotspotModel;

		markers.fetch({
			success : displayMarkers,
			error : Ti.API.error
		});

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - showMap");
	}

	function displayMarkers() {
		try {
			markers.each(function(marker) {
				var markerAnnotation = MapModule.createAnnotation({
					latitude : marker.get('xkoord'),
					longitude : marker.get('ykoord'),
					title : marker.get('name')
				});

				map3.addAnnotation(markerAnnotation);
			});
		} catch(e) {
			newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - displayMarkers");
		}

	}

	//----------------------------------------------------------------
	// GeoJSON - test
	//----------------------------------------------------------------
	// function geoJSONTest() {
	// var geojsonFeature = {
	// "type" : "Feature",
	// "properties" : {
	// "name" : "GEOJSON",
	// "amenity" : "Test",
	// "popupContent" : "TestTestTest!"
	// },
	// "geometry" : {
	// "type" : "Point",
	// "coordinates" : [58.881189, 10.992495]
	// }
	// };
	//
	// var myLayer = L.geoJson().addTo(map);
	// myLayer.addData(geojsonFeature);
	// }

	//geoJSONTest();
	$.mapView.add(map3);
};
