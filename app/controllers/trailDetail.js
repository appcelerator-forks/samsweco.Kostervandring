var args = arguments[0] || {};

$.lblTrailName.text = "Vandringsled : " + args.title || 'Default Name';
$.lblTrailLength.text = "Distans: " + args.length + " kilometer" || 'Default Length';
$.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
$.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';

var trailId = args.id;

selectTrailPics();
//showHotspots();

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






//ERROR: message = "undefined is not an object (evaluating 'hotstrailCollection.fetch')";

// function showHotspots(){
	// var id = getHotspotId();
	// var hotCollection = Alloy.Collections.hotspotModel;
	// hotCollection.fetch({
		// query: 'SELECT name,image from hotspotModel where id="' + id + '"'
	// });
// 	
	// var hot = hotCollection.toJSON();
	// for (var i = 0; i < hotTrails.length; i++) {
		// //var view_args = {
			// $.listImageview.image = '/pics/' + hotTrails[i].cover_pic;
			// $.lblHotName.text = name;
// 			
			// //text : name,
			// //image : '/pics/' + hotTrails[i].cover_pic
		// };
// }
// 
// function getHotspotId(){
	// var id = trailId;
	// var hotstrailCollection = Alloy.Collections.hotspot_trailModel;
	// hotstrailCollection.fetch({
		// query: 'SELECT hotspotID from hotspot_trailModel where trailsID="' + trailId + '"'
	// });
// 	
	// var hotTrails = hotstrailCollection.toJSON();
// 	
	// Ti.API.info(hotTrails);
	// return hotTrails;
// }


$.trailDetail.open();
