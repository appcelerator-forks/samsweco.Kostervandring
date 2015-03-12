var args = arguments[0] || {};
showMap();

function goHome(e) {
	$.map.close();
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
			height : '85%',
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
