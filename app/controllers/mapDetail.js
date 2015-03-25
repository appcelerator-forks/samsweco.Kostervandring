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

function showMap() {
	try {
		zoomedMap = MapModule.createView({
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

				zoomedMap.addAnnotation(markerAnnotation);
			});
		} catch(e) {
			newError("Något gick fel när sidan skulle laddas, prova igen!", "Map - displayMarkers");
		}
	}


	$.mapDetailView.add(zoomedMap);
};

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

$.btnNormal.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.SATELLITE_TYPE;
});
