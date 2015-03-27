var args = arguments[0] || {};

var zoomedName = args.name;
var zoomColor = args.color;
var zoomLat = args.zoomlat;
var route;
var radius = 10;
var baseMap;
var MapModule = require('ti.map');
var infospotsNotVisible = true;
var hotspotsNotVisible = true;

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
displayTrailMarkers();

function createMapRoutes(file, name, color) {
	var adventureRoute = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/routes/" + file).read().text;
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
			width : '2dp'
		};
		baseMap.addRoute(MapModule.createRoute(route));
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
	gLon = coordinatesObj.longitude;

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
		baseMap = MapModule.createView({
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

		$.mapView.add(baseMap);

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - showMap");
	}

};

function displayTrailMarkers() {
	var pinCollection = Alloy.Collections.trailsModel;
	pinCollection.fetch({
		query : 'SELECT name, pin, pinLon, pinLat FROM trailsModel'
	});

	var jsonObj = pinCollection.toJSON();
	for (var i = 0; i < jsonObj.length; i++) {
		var markerAnnotation = MapModule.createAnnotation({
			latitude : jsonObj[i].pinLat,
			longitude : jsonObj[i].pinLon,
			title : jsonObj[i].name,
			subtitle : 'Läs mer om ' + jsonObj[i].name + ' här!',
			image : '/pins/' + jsonObj[i].pin,
			centerOffset : {
				x : 0,
				y : -25
			}
		});
		baseMap.addAnnotation(markerAnnotation);
	}
}

function displayMarkers() {
	var markerArray = [];
	var markersCollection = Alloy.Collections.hotspotModel;
	markersCollection.fetch();

	var markersJSON = markersCollection.toJSON();
	for (var u = 0; u < markersJSON.length; u++) {
		var marker = MapModule.createAnnotation({
			latitude : markersJSON[u].ykoord,
			longitude : markersJSON[u].xkoord,
			title : markersJSON[u].name,
			subtitle : 'Läs mer om ' + markersJSON[u].name + ' här!'
		});

		markerArray.push(marker);
	}

	baseMap.addAnnotations(markerArray);
	hotspotsNotVisible = false;
}

function displayInfoSpots() {
	var infoArray = [];
	var markerArray = [];
	
	var infoSpotCollection = Alloy.Collections.infospotModel;
	infoSpotCollection.fetch({
		query : 'select infospotModel.name, infospotModel.icon, infospotCoordinatesModel.latitude, infospotCoordinatesModel.longitude from infospotCoordinatesModel join infospotModel on infospotCoordinatesModel.infospotID = infospotModel.id'
	});

	var infoJSON = infoSpotCollection.toJSON();
	Ti.API.info("infoJSON : " + JSON.stringify(infoJSON));
	
	for (var u = 0; u < infoJSON.length; u++) {
		var marker = MapModule.createAnnotation({
			latitude : infoJSON[u].latitude,
			longitude : infoJSON[u].longitude,
			image : '/piktogram/' + infoJSON[u].icon,
			imageHeight : '20dp'
		});

		markerArray.push(marker);
	}
	
	Ti.API.info("markerArray : " + JSON.stringify(markerArray));
	baseMap.addAnnotations(markerArray);
	infospotsNotVisible = false;
}

$.btnShowInfo.addEventListener('click', function(){
	if(infospotsNotVisible){
		displayInfoSpots();
	}
});

$.btnShowHot.addEventListener('click', function(){
	if(hotspotsNotVisible){
		displayMarkers();
	}
});

$.btnNormal.addEventListener('click', function() {
	baseMap.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	baseMap.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	baseMap.mapType = MapModule.SATELLITE_TYPE;
});
