var args = arguments[0] || {};

$.lblHotspotName.text = args.title || "Name";
$.lblHotspotInfoTxt.text = args.infoTxt || "Info";

var hotspotId = args.id || "Id";
var picId = args.filename || "filename";

setPics();
setPicText();

//-----------------------------------------------------------
// Sätter bilder till bildspelet
//-----------------------------------------------------------
function setPics() {
	try {
			selectHotspotPics();
//		}
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - setPics");
	}
}
//-----------------------------------------------------------
// Hämtar bilder för bildspelet
//-----------------------------------------------------------
function selectHotspotPics() {
	try {

		var mediaCollection = getMediaCollection();
			mediaCollection.fetch({
		query : 'SELECT * FROM mediaModel WHERE hotspot_id = "' + hotspotId + '"'
	});
		var jsonMedia = mediaCollection.toJSON();
		
		for (var i = 0; i < jsonMedia.length; i++) {
			var view_args = {
				backgroundImage : "/pics/" + jsonMedia[i].filename
			};

			var img_view = Ti.UI.createView(view_args);
			$.slideShowHotspotDetail.addView(img_view);
		}
		
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - selectHotspotPics");
	}
}

//---------------------------------------------------------
//Sätter bildtexter till hotspotsen
//---------------------------------------------------------
function setPicText()
{
	var textCollection = Alloy.Collections.mediaModel;
	textCollection.fetch({
		query : 'SELECT * FROM mediaModel where id = 9'
	});

	txt = textCollection.toJSON();
	
	imgTxt = txt[0].img_txt;
	
	$.lblImgTxt.text = imgTxt;
//	Ti.API.info('HÄR ÄR INFORMATION SOM VI VILL SE : ' + imgTxt);
}


