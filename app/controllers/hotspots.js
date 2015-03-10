var args = arguments[0] || {};

var hotspotCollection = Alloy.Collections.hotspotModel;
hotspotCollection.fetch();

//transformFunction(hotspotModel);

function transformFunction(model){
	var transform = model.toJSON();
	transform.cover = "/pics/" + transform.filename;
	
	Titanium.API.info(transform.cover);
	return transform;
}

function showHotspotDetails(hotspot) {
	Titanium.API.info(hotspot.name);
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
	$.hotspots.close();
}

$.closeWin.addEventListener("click", close);

function close() {
	$.destroy();
	$.hotspots.close();
}

$.hotspots.open();
