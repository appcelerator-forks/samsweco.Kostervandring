var args = arguments[0] || {};

var hotspotCollection = Alloy.Collections.hotspotModel;
hotspotCollection.fetch();
	Titanium.API.info(JSON.stringify(hotspotCollection));
	

function showHotspotDetails(hotspot)
{
	Titanium.API.info(hotspot.name);
	var selectedHotspot = hotspot.row;
	var args = {
		title: selectedHotspot.title,
		infoTxt: selectedHotspot.infoTxt,
		xkoord : selectedHotspot.xkoord,
		ykoord: selectedHotspot.ykoord
	};
	
	var hotspotDetail = Alloy.createController("hotspotDetail", args).getView();
	hotspotDetail.open();
	$.hotspots.close();
}

$.closeWin.addEventListener("click", close);

function close(){
	$.destroy();
	$.hotspots.close();
}