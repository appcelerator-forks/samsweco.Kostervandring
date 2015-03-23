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
// addRoutes();

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
		// Ti.API.info(JSON.stringify(e.coords));
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
			//	Ti.API.info(JSON.stringify(e.coords));
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

$.btnNormal.addEventListener('click', function() {
	map3.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	map3.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	map3.mapType = MapModule.SATELLITE_TYPE;
});

// function addRoutes(){
// addYellowRoute();
// addGreenRoute();
// addOrangeRoute();
// }
//
// function addYellowRoute() {
// var testPoints = [{
// latitude : 58.891340,
// longitude : 11.008121
// }, {
// latitude : 58.890869,
// longitude : 11.008969
// }, {
// latitude : 58.890326,
// longitude : 11.009591
// }, {
// latitude : 58.889162,
// longitude : 11.009666
// }, {
// latitude : 58.888940,
// longitude : 11.009816
// }, {
// latitude : 58.888264,
// longitude : 11.010717
// }, {
// latitude : 58.887954,
// longitude : 11.010899
// }, {
// latitude : 58.887699,
// longitude : 11.010717
// }, {
// latitude : 58.887488,
// longitude : 11.010856
// }, {
// latitude : 58.887061,
// longitude : 11.011607
// }, {
// latitude : 58.887011,
// longitude : 11.012176
// }, {
// latitude : 58.886856,
// longitude : 11.012680
// }, {
// latitude : 58.886457,
// longitude : 11.013131
// }, {
// latitude : 58.886224,
// longitude : 11.013313
// }, {
// latitude : 58.885681,
// longitude : 11.012122
// }, {
// latitude : 58.884783,
// longitude : 11.006071
// }];
//
// var route = MapModule.createRoute({
// points : testPoints,
// color : "yellow",
// width : 2
// });
//
// map3.addRoute(route);
// }
//
// function addGreenRoute() {
// var testPoints = [{
// latitude : 58.880741,
// longitude : 11.008442
// }, {
// latitude : 58.880286,
// longitude : 11.011231
// }, {
// latitude : 58.880541,
// longitude : 11.014085
// }, {
// latitude : 58.882116,
// longitude : 11.018226
// }, {
// latitude : 58.882970,
// longitude : 11.022314
// }, {
// latitude : 58.884245,
// longitude : 11.027818
// }, {
// latitude : 58.884993,
// longitude : 11.029556
// }, {
// latitude : 58.885331,
// longitude : 11.030189
// }, {
// latitude : 58.884976,
// longitude : 11.033032
// }, {
// latitude : 58.885453,
// longitude : 11.034459
// }, {
// latitude : 58.885558,
// longitude : 11.035457
// }, {
// latitude : 58.884865,
// longitude : 11.039491
// }, {
// latitude : 58.884028,
// longitude : 11.040559
// }, {
// latitude : 58.882553,
// longitude : 11.040103
// }, {
// latitude : 58.882159,
// longitude : 11.039390
// }, {
// latitude : 58.881383,
// longitude : 11.039175
// }, {
// latitude : 58.880540,
// longitude : 11.038317
// }, {
// latitude : 58.878588,
// longitude : 11.040977
// }, {
// latitude : 58.878389,
// longitude : 11.045269
// }, {
// latitude : 58.879459,
// longitude : 11.045811
// }];
//
// var route = MapModule.createRoute({
// points : testPoints,
// color : "green",
// width : 2
// });
//
// map3.addRoute(route);
// }
//
// function addOrangeRoute() {
// var testPoints = [{
// latitude : 58.897060,
// longitude : 11.005058
// }, {
// latitude : 58.897725,
// longitude : 11.003856
// }, {
// latitude : 58.898169,
// longitude : 11.001882
// }, {
// latitude : 58.899499,
// longitude : 10.997676
// }, {
// latitude : 58.901272,
// longitude : 10.993728
// }, {
// latitude : 58.903067,
// longitude : 10.992424
// }, {
// latitude : 58.905112,
// longitude : 10.991496
// }, {
// latitude : 58.905865,
// longitude : 10.992440
// }, {
// latitude : 58.906619,
// longitude : 10.994157
// }, {
// latitude : 58.909057,
// longitude : 10.997332
// }, {
// latitude : 58.910376,
// longitude : 11.000481
// }, {
// latitude : 58.910354,
// longitude : 11.001431
// }, {
// latitude : 58.909966,
// longitude : 11.001769
// }, {
// latitude : 58.908043,
// longitude : 11.005272
// }, {
// latitude : 58.905710,
// longitude : 11.006651
// }, {
// latitude : 58.903455,
// longitude : 11.006313
// }, {
// latitude : 58.901903,
// longitude : 11.008287
// }, {
// latitude : 58.899509,
// longitude :  11.007944
// }, {
// latitude : 58.897159,
// longitude : 11.005197
// }];
//
// var route = MapModule.createRoute({
// points : testPoints,
// color : "orange",
// width : 2
// });
//
// map3.addRoute(route);
// }
