var args = arguments[0] || {};

$.lblHotspotName.text = args.title || "Name";
$.lblHotspotInfoTxt.text = args.infoTxt || "Info";

var hotspotId = args.id || "Id";

setPics();

function setPics() {

	try {
		if (args.informationNaturum != null) {
			setNaturumInfo();
			selectNaturumPics();
		} else if (args.informationKoster != null) {
			setKosterInfo();
			selectKosterPics();
		} else {
			selectHotspotPics();
		}
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - setPics");
	}
}

function selectHotspotPics() {
	try {

		var media = getMediaCollection();
		var jsonMedia = media.toJSON();
		
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
