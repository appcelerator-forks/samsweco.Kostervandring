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
