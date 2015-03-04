
function nextPage(){
	var trails = Alloy.createController("trails").getView();
	trails.open();
}

function hotspotView(){
	var hotspots = Alloy.createController("hotspots").getView();
	hotspots.open();
}

// var infoTxtCollection = Alloy.Collections.infoTxtModel;
// infoTxtCollection.fetch({query: 'SELECT infoTxt from infoTxtModel where id= 1'});
// var jsonObj = infoTxtCollection.toJSON();	
// $.lblheadInfo.text = jsonObj[0].infoTxt;

function aboutKoster(){
	
	
	var hotspotCollection = Alloy.Collections.hotspotModel;
	hotspotCollection.fetch({query: 'SELECT infoTxt from hotspotModel where id= 13'});
	
	var jsonObj = hotspotCollection.toJSON();	
	
	var txt = JSON.stringify(jsonObj[0].infoTxt);
	Titanium.API.info(txt);
	
		var infoTxt = {
		information : txt
	};
	
	//$.lblHotspotName.text = "Hej";
	// $.lblTrailLength.text = "Distans: " + args.length  + " kilometer"|| 'Default Length';
	// $.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
	// $.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';
	
	// var trailDetail = Alloy.createController("trailDetail", args).getView();
	// trailDetail.open();
	// $.trails.close();
// }
	var hotspotDetail = Alloy.createController("hotspotDetail", infoTxt).getView();
	hotspotDetail.open();
	$.index.close();
}



$.index.open();

