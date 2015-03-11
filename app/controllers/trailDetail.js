var args = arguments[0] || {};

$.lblTrailName.text = "Vandringsled : " + args.title || 'Default Name';
$.lblTrailLength.text = "Distans: " + args.length + " kilometer" || 'Default Length';
$.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
$.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';

var trailId = args.id;

selectTrailPics();
showHotspots();

function selectTrailPics() {

	var id = trailId;
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({
		query : 'SELECT filename from mediaModel where trail_id="' + trailId + '"'
	});

	var jsonObj = mediaCollection.toJSON();
	for (var i = 0; i < jsonObj.length; i++) {
		var view_args = {
			backgroundImage : '/pics/' + jsonObj[i].filename
		};

		var img_view = Ti.UI.createView(view_args);
		$.slideShowTrails.addView(img_view);
	}
}

function showHotspots() {
	var data = getHotspotData();

	// var hotCollection = Alloy.Collections.hotspotModel;
	// hotCollection.fetch({
	// query : 'SELECT name, cover_pic from hotspotModel where id="' + id + '"'
	// });

	// var hotTrails = data.toJSON();
	
	for (var i = 0; i < data.length; i++) {
		$.listImageview.image = '/pics/' + data[i].cover_pic; 
		$.lblHotName.text = data[i].name;
	};
	
	alert(data);
}

// function getHotspotId() {
// var id = trailId;
// Ti.API.info(id);
//
// var hotstrailCollection = Alloy.Collections.hotspot_trailsModel;
// hotstrailCollection.fetch({
// query : 'SELECT hotspotID from hotspot_trailsModel where trailsID="' + trailId + '"'
// });
//
// var hotTrails = hotstrailCollection.toJSON();
//
// Ti.API.info(hotTrails);
// // return hotTrails;
// }

function getHotspotData() {
	var id = trailId;

	var hotstrailCollection = Alloy.Collections.hotspotModel;
	hotstrailCollection.fetch({
		query : 'SELECT hotspotModel.name, hotspotModel.cover_pic from hotspotModel join hotspot_trailsModel on hotspotModel.id = hotspot_trailsModel.hotspotID where trailsID ="' + id + '"'
	});

	var hotTrails = hotstrailCollection.toJSON();
	return hotTrails;
}

$.trailDetail.open();
