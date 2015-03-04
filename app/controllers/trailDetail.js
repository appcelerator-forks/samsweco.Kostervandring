var args = arguments[0] || {};

$.lblTrailName.text = "Vandringsled : " + args.title || 'Default Name';
$.lblTrailLength.text = "Distans: " + args.length  + " kilometer"|| 'Default Length';
$.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
$.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';

var trailId = args.id;

selectTrailPics();

function selectTrailPics(){
	
	var id = trailId;
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({query: 'SELECT filename from mediaModel where trail_id="'+trailId+'"'});
	
	
	var jsonObj = mediaCollection.toJSON();	
	for(var i = 0; i < jsonObj.length; i++){
		var view_args = {
		 backgroundImage : 'pics/'+jsonObj[i].filename
	};
	
	var img_view = Ti.UI.createView(view_args);	
	$.slideShowTrails.addView(img_view);
}
}

$.trailDetail.open();
