var args = arguments[0] || {};
var route;
var radius = 10;
var map3;
var MapModule = require('ti.map');
showMap();

createMapRoutes('adventureroute.json', 'Äventyrsleden', 'purple');
createMapRoutes('blueroute.json', 'Blåa leden', 'blue');
createMapRoutes('blueshortcut.json', 'Genväg blåa leden', 'blue');
createMapRoutes('greenroute.json', 'Gröna leden', 'green');
createMapRoutes('orangeroute.json', 'Orange leden', 'orange');
createMapRoutes('redroute.json', 'Röda leden', 'red');
createMapRoutes('redrouteeasy.json', 'Lättare led, röda leden', 'red');
createMapRoutes('redrouteeasy2.json', 'Lättare led, röda leden', 'red');
createMapRoutes('whiteroute.json', 'Vita leden', 'white');
createMapRoutes('yellowroute.json', 'Gula leden', 'yellow');

function createMapRoutes(file, name, color) {

	var adventureRoute = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "rutter/" + file).read().text;
	var v = JSON.parse(adventureRoute);

	var array = [];
	array.push(v);

	for (var u = 0; u < array.length; u++) {
		var coords = array[0].features[0].geometry.paths[u];

		var j = new Array();

		for (var i = 0; i < coords.length; i++) {

			var c = {
				latitude : coords[i][1],
				longitude : coords[i][0]
			};
				j.push(c);
		}

		var route = {
			name : name,
			points : j,
			color : color,
			width : 2
		};
		map3.addRoute(MapModule.createRoute(route));
	}
}

Ti.Geolocation.getCurrentPosition(function(e) {
	if (e.error) {
		alert('Get current position' + e.error);
	} else {
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
			showDialog();
		}
	}
}

function showMap() {
	try {
		map3 = MapModule.createView({
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
	$.mapView.add(map3);
};

function zoomMap(){
	
  map3.region = {
		latitude : 58.89277,
		longitude : 11.04113,
		latitudeDelta : 0.1,
		longitudeDelta : 0.1
  };
}

$.btnNormal.addEventListener('click', function() {
	map3.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	map3.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	map3.mapType = MapModule.SATELLITE_TYPE;
});
