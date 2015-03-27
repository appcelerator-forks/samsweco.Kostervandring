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
createMapRoutes(getFile(), zoomName, zoomColor);
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

function createMapRoutes(file, name, color) {
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
				title : markersJSON[u].name,
				rightButton : '/images/arrow.png',
				id : markersJSON[u].name
			});

			markerArray.push(marker);
		}
	}

	zoomedMap.addAnnotations(markerArray);
}

zoomedMap.addEventListener('click', function(evt) {
    if (evt.clicksource == 'rightButton') {
        Titanium.API.info('Right button clicked');
        //add code for button click activity here
    };
    var myid = (evt.annotation.id)?evt.annotation.myid:-1;
    Titanium.API.info('Anotation id = ' + myid);
});

function displayTrailMarkers() {
	var pinCollection = Alloy.Collections.trailsModel;
	pinCollection.fetch({
		query : 'SELECT name, pin, pinLon, pinLat FROM trailsModel where id ="' + zoomId + '"'
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

$.btnNormal.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.NORMAL_TYPE;
});

$.btnHybrid.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.HYBRID_TYPE;
});

$.btnSatellit.addEventListener('click', function() {
	zoomedMap.mapType = MapModule.SATELLITE_TYPE;
});
