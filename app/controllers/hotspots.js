var args = arguments[0] || {};

var hotspotCollection = Alloy.Collections.hotspotModel;
hotspotCollection.fetch();

function showHotspotDetails(hotspot)
{
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