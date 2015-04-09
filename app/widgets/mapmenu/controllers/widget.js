

function normalMap(){
		$.baseMap.mapType = MapModule.NORMAL_TYPE;
}

function hybridMap(){
		$.baseMap.mapType = MapModule.HYBRID_TYPE;
}


function satelliteMap(){
		$.baseMap.mapType = MapModule.SATELLITE_TYPE;
}

// function displayInfoSpots() {
	// if (infospotsNotVisible) {
		// var markerArray = [];
		// infospotCollection.fetch({
			// query : 'select infospotModel.name, infospotModel.icon, infospotCoordinatesModel.latitude, infospotCoordinatesModel.longitude from infospotCoordinatesModel join infospotModel on infospotCoordinatesModel.infospotID = infospotModel.id'
		// });
// 
		// var infoJSON = infospotCollection.toJSON();
// 
		// for (var u = 0; u < infoJSON.length; u++) {
			// var marker = MapModule.createAnnotation({
				// latitude : infoJSON[u].latitude,
				// longitude : infoJSON[u].longitude
			// });
// 			
			// if(OS_ANDROID){
				// marker.image = '/images/map_' + infoJSON[u].icon;
			// }
			// if(OS_IOS){
				// marker.image = '/piktogram/map_' + infoJSON[u].icon;
			// }
			// markerArray.push(marker);
		// }
// 
		// baseMap.addAnnotations(markerArray);
		// infospotsNotVisible = false;
// 
	// } else if (!infospotsNotVisible) {
		// baseMap.removeAnnotation(markerArray);
	// }
// }
// 
// function showHotspot(myId) {
	// try {
		// hotspotCollection.fetch({
			// query : 'SELECT id, infoTxt FROM hotspotModel where name = "' + myId + '"'
		// });
// 
		// var jsonObjHot = hotspotCollection.toJSON();
// 
		// var hotspotTxt = {
			// title : myId,
			// infoTxt : jsonObjHot[0].infoTxt,
			// id : jsonObjHot[0].id
		// };
// 
		// var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
		// Alloy.CFG.tabs.activeTab.open(hotspotDetail);
	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "map - showHotspot");
	// }
// }