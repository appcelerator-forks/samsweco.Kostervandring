var args = arguments[0] || {};

try {
	var hotspotCollection = Alloy.Collections.hotspotModel;
	hotspotCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "Hotspots - create hotspotCollection");
}

function showHotspotDetails(hotspot) {
	try {
		var selectedHotspot = hotspot.row;
		var args = {
			id : selectedHotspot.number,
			title : selectedHotspot.name,
			infoTxt : selectedHotspot.infoTxt,
			xkoord : selectedHotspot.xkoord,
			ykoord : selectedHotspot.ykoord
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", args).getView();
		hotspotDetail.open();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - showHotspotDetails");
	}
}

$.hotspots.open();
