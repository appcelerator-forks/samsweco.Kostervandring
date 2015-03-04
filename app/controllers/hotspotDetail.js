var args = arguments[0] || {};

$.lblHotspotName.text = args.title || "Name";
$.lblHotspotInfoTxt.text = args.infoTxt || "Info";
$.lblHotspotX.text = args.xkoord || "x";
$.lblHotspotY.text = args.ykoord || "y";

hotspotId = args.id;

Titanium.API.info("Naturum : "+args.informationNaturum);
Titanium.API.info("Koster : "+args.informationKoster);

if(args.informationNaturum != null){
	setNaturumInfo();
	selectNaturumPics();
}

if(args.informationKoster != null){
	setKosterInfo();
	selectKosterPics();
}

function selectHotspotPics(){
	
	var id = hotspotId;
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({query: 'SELECT filename from mediaModel where hotspot_id="'+trailId+'"'});
	
	
	var jsonObj = mediaCollection.toJSON();	
	for(var i = 0; i < jsonObj.length; i++){
		var view_args = {
		 backgroundImage : jsonObj[i].filename
	};
	
	var img_view = Ti.UI.createView(view_args);	
	$.slideShowTrails.addView(img_view);
}
}

function selectNaturumPics(){

	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({query: 'SELECT filename from mediaModel where other="naturum"'});
	
	
	var jsonObj = mediaCollection.toJSON();	
	for(var i = 0; i < jsonObj.length; i++){
		var view_args = {
		 backgroundImage : 'pics/'+jsonObj[i].filename
	};
	
	var img_view = Ti.UI.createView(view_args);	
	$.slideShowHotspotDetail.addView(img_view);
}
}

function selectKosterPics(){

	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({query: 'SELECT filename from mediaModel where other="koster"'});
	
	
	var jsonObj = mediaCollection.toJSON();	
	for(var i = 0; i < jsonObj.length; i++){
		var view_args = {
		 backgroundImage : 'pics/'+jsonObj[i].filename
	};
	
	var img_view = Ti.UI.createView(view_args);	
	$.slideShowHotspotDetail.addView(img_view);
}
}

function setNaturumInfo(){
	$.lblHotspotInfoTxt.text = args.informationNaturum;
}

function setKosterInfo(){
	$.lblHotspotInfoTxt.text = args.informationKoster;
}
$.hotspotDetail.open();
