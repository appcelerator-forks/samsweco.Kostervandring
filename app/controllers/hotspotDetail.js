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

		var mediaCollection = Alloy.Collections.mediaModel;
		mediaCollection.fetch({
			query : 'SELECT filename from mediaModel where hotspot_id="' + hotspotId + '"'
		});

		var jsonObj = mediaCollection.toJSON();
		
		for (var i = 0; i < jsonObj.length; i++) {
			var view_args = {
				backgroundImage : "/pics/" + jsonObj[i].filename
			};

			var img_view = Ti.UI.createView(view_args);
			$.slideShowHotspotDetail.addView(img_view);
		}
		
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - selectHotspotPics");
	}

}

function selectNaturumPics() {
	try {
		var mediaCollection = Alloy.Collections.mediaModel;
		mediaCollection.fetch({
			query : 'SELECT filename from mediaModel where other="naturum"'
		});

		var jsonObj = mediaCollection.toJSON();
		for (var i = 0; i < jsonObj.length; i++) {
			var view_args = {
				backgroundImage : '/pics/' + jsonObj[i].filename
			};

			var img_view = Ti.UI.createView(view_args);
			$.slideShowHotspotDetail.addView(img_view);
		}

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - selectNaturumPics");
	}

}

function selectKosterPics() {
	try {
		var mediaCollection = Alloy.Collections.mediaModel;
		mediaCollection.fetch({
			query : 'SELECT filename from mediaModel where other="koster"'
		});

		var jsonObj = mediaCollection.toJSON();
		for (var i = 0; i < jsonObj.length; i++) {
			var view_args = {
				backgroundImage : '/pics/' + jsonObj[i].filename
			};

			var img_view = Ti.UI.createView(view_args);
			$.slideShowHotspotDetail.addView(img_view);
		}

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - selectKosterPics");
	}

}

function setNaturumInfo() {
	$.lblHotspotInfoTxt.text = args.informationNaturum;
}

function setKosterInfo() {
	$.lblHotspotInfoTxt.text = args.informationKoster;
}

// $.hotspotDetail.open();
