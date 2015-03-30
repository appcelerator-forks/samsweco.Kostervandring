var args = arguments[0] || {};

var zoomName = args.title;
var zoomColor = args.color;
var zoomLat = args.zoomlat;
var zoomLon = args.zoomlon;
var zoomId = args.id;

var radius = 10;
var zoomedMap;
var MapModule = require('ti.map');

showMap();
setRoute();
addAnnotations();
displayTrailMarkers();

function showMap() {
	try {
		zoomedMap = MapModule.createView({
			userLocation : true,
			mapType : MapModule.SATELLITE_TYPE,
			animate : true,
			region : {
			latitude : zoomLat,
			longitude : zoomLon,
			latitudeDelta : 0.03,
			longitudeDelta : 0.03
			},
			height : '90%',
			width : Ti.UI.FILL
		});

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - showMap");
	}

	$.mapDetailView.add(zoomedMap);
};

function calculateMapRegion(trailCoordinates) {
	// var region = {
		// latitude : 59.27866,
		// longitude : 15.21042,
		// latitudeDelta : 9,
		// longitudeDelta : 9
	// };
	if (trailCoordinates.length != 0) {
		var poiCenter = {};
		var delta = 0.02;
		var minLat = trailCoordinates[0].latitude,
		    maxLat = trailCoordinates[0].latitude,
		    minLon = trailCoordinates[0].longitude,
		    maxLon = trailCoordinates[0].longitude;
		for (var i = 0; i < trailCoordinates.length - 1; i++) {
			minLat = Math.min(trailCoordinates[i + 1].latitude, minLat);
			maxLat = Math.max(trailCoordinates[i + 1].latitude, maxLat);
			minLon = Math.min(trailCoordinates[i + 1].longitude, minLon);
			maxLon = Math.max(trailCoordinates[i + 1].longitude, maxLon);
		}

		var deltaLat = maxLat - minLat;
		var deltaLon = maxLon - minLon;

		delta = Math.max(deltaLat, deltaLon);
		//Change multiplier if it's too close
		delta = delta * 1.2;

		poiCenter.lat = maxLat - parseFloat((maxLat - minLat) / 2);
		poiCenter.lon = maxLon - parseFloat((maxLon - minLon) / 2);

		region = {
			latitude : poiCenter.lat,
			longitude : poiCenter.lon,
			latitudeDelta : delta,
			longitudeDelta : delta
		};
	}
	return region;
};

function setRoute() {

	var file = getFile(zoomId);

	for (var u = 0; u < file.length; u++) {
		createMapRoutes(file[u].filename, zoomName, zoomColor);
	}
}

function createMapRoutes(file, name, color) {
	var zoomedRoute = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/routes/" + file).read().text;
	var v = JSON.parse(zoomedRoute);

	var array = [];
	array.push(v);

	var coordArray = [];

	for (var u = 0; u < array.length; u++) {
		var coords = array[0].features[0].geometry.paths[u];

		for (var i = 0; i < coords.length; i++) {

			var c = {
				latitude : coords[i][1],
				longitude : coords[i][0]
			};
			coordArray.push(c);
		}

		var route = {
			name : name,
			points : coordArray,
			color : color,
			width : '2dp'
		};
		zoomedMap.addRoute(MapModule.createRoute(route));
	}

	zoomedMap.region = calculateMapRegion(coordArray);
}

function getFile() {
	var jsonFileCollection = Alloy.Collections.jsonFilesModel;
	jsonFileCollection.fetch({
		query : 'SELECT filename FROM jsonFilesModel WHERE trailID ="' + zoomId + '"'
	});

	var filename = jsonFileCollection.toJSON();
	return filename;
}

function addAnnotations() {
	var markerArray = [];
	var markersCollection = Alloy.Collections.hotspotModel;
	var idCollection = getID();

	for (var i = 0; i < idCollection.length; i++) {
		markersCollection.fetch({
			query : 'SELECT name, ykoord, xkoord FROM hotspotModel where id="' + idCollection[i] + '"'
		});

		var markersJSON = markersCollection.toJSON();
		for (var u = 0; u < markersJSON.length; u++) {
			var marker = MapModule.createAnnotation({
				id : markersJSON[u].name,
				latitude : markersJSON[u].ykoord,
				longitude : markersJSON[u].xkoord,
				title : markersJSON[u].name,
				rightButton : '/images/arrow.png',
				image : '/pins/map_hotspot.png',
				name : 'hotspot'
			});

			markerArray.push(marker);
		}
	}

	zoomedMap.addAnnotations(markerArray);
}

function displayTrailMarkers() {
	var pinCollection = Alloy.Collections.trailsModel;
	pinCollection.fetch({
		query : 'SELECT name, pin, pinLon, pinLat FROM trailsModel where id ="' + zoomId + '"'
	});

	var jsonObj = pinCollection.toJSON();
	for (var i = 0; i < jsonObj.length; i++) {
		var markerAnnotation = MapModule.createAnnotation({
			id : jsonObj[i].name,
			latitude : jsonObj[i].pinLat,
			longitude : jsonObj[i].pinLon,
			title : jsonObj[i].name,
			subtitle : jsonObj[i].name + ' startar här!',
			image : '/pins/' + jsonObj[i].pin,
			centerOffset : {
				x : 0,
				y : -15
			}
		});

		zoomedMap.addAnnotation(markerAnnotation);
	}
}

function getID() {
	var idArray = [];

	var hotspot_trailsCollection = Alloy.Collections.hotspot_trailsModel;
	hotspot_trailsCollection.fetch({
		query : 'SELECT hotspotID FROM hotspot_trailsModel WHERE trailsID ="' + zoomId + '"'
	});

	var jsonObj = hotspot_trailsCollection.toJSON();

	for (var i = 0; i < jsonObj.length; i++) {
		idArray.push(jsonObj[i].hotspotID);
	}

	return idArray;
}

zoomedMap.addEventListener('click', function(evt) {
	if (evt.clicksource == 'rightButton') {
		var hotspotCollection = Alloy.Collections.hotspotModel;
		hotspotCollection.fetch({
			query : 'SELECT id, infoTxt from hotspotModel where name = "' + evt.annotation.id + '"'
		});

		var jsonObj = hotspotCollection.toJSON();

		var hotspotTxt = {
			title : evt.annotation.id,
			infoTxt : jsonObj[0].infoTxt,
			id : jsonObj[0].id
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
		Alloy.CFG.tabs.activeTab.open(hotspotDetail);
	};
});

$.btnNormal.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.SATELLITE_TYPE;
});
