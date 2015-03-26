var args = arguments[0] || {};

var zoomName = args.title;
var zoomColor = args.color;
var zoomLat = args.zoomlat;
var zoomLon = args.zoomlon;
var zoomId = args.id;

Ti.API.info(JSON.stringify(args));

var radius = 10;
var zoomedMap;
var MapModule = require('ti.map');

showMap();
createMapRoutes(getFile(), zoomName, zoomColor);
addAnnotations();

function showMap() {
	try {
		zoomedMap = MapModule.createView({
			userLocation : true,
			mapType : MapModule.SATELLITE_TYPE,
			animate : true,
			region : {
				latitude : 58.893539,
				longitude : 11.012579,
				latitudeDelta : 0.03,
				longitudeDelta : 0.03
			},
			height : '90%',
			width : Ti.UI.FILL
		});

		$.mapDetailView.add(zoomedMap);
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - showMap");
	}
}

function createMapRoutes(file, name, color) {
	Ti.API.info(file);

	var zoomedRoute = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "/routes/" + file).read().text;
	var v = JSON.parse(zoomedRoute);

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
		zoomedMap.addRoute(MapModule.createRoute(route));
	}
}

function getFile() {
	var jsonFileCollection = Alloy.Collections.jsonFilesModel;
	jsonFileCollection.fetch({
		query : 'SELECT filename FROM jsonFilesModel WHERE trailID ="' + zoomId + '"'
	});

	var filename = jsonFileCollection.toJSON();
	return filename[0].filename;
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
				latitude : markersJSON[u].ykoord,
				longitude : markersJSON[u].xkoord,
				title : markersJSON[u].name
			});

			markerArray.push(marker);
		}
	}
	zoomedMap.addAnnotations(markerArray);
}

function getID() {
	var idArray = [];

	var hotspot_trailsCollection = Alloy.Collections.hotspot_trailsModel;
	hotspot_trailsCollection.fetch({
		query : 'SELECT hotspotID FROM hotspot_trailsModel WHERE trailsID ="' + zoomId + '"'
	});

	var jsonObj = hotspot_trailsCollection.toJSON();
	Ti.API.info("Json obh : " + JSON.stringify(jsonObj));

	for (var i = 0; i < jsonObj.length; i++) {
		idArray.push(jsonObj[i].hotspotID);
	}
	Ti.API.info("IdArray: " + JSON.stringify(idArray));
	return idArray;
}

$.btnNormal.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.SATELLITE_TYPE;
});
