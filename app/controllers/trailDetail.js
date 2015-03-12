var args = arguments[0] || {};

try {
	$.lblTrailName.text = "Vandringsled : " + args.title || 'Default Name';
	$.lblTrailLength.text = "Distans: " + args.length + " kilometer" || 'Default Length';
	$.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
	$.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';

	var trailId = args.id;
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - set labels");
}

selectTrailPics();
showHotspots();

showIcons();

function selectTrailPics() {
	try {
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
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - selectTrailPics");
	}

}

function showHotspots() {
	try {
		var tableViewData = [];
		var rows = getHotspotData();

		for (var i = 0; i < rows.length; i++) {
			var row = Ti.UI.createTableViewRow({
				layout : 'horizontal',
				height : '60dp',
				top: 0
				});
			var coverimg = Ti.UI.createImageView({
				height : '60dp',
				width : '90dp',
				left: 10
				});
			var lblName = Ti.UI.createLabel({
				left: 10,	
				font: {
				fontSize: 12
				}
				});

			coverimg.image = rows[i].cover_pic;
			lblName.text = rows[i].name;

			//tableViewData.push(row.add(coverimg), row.add(lblName));
			row.add(coverimg);
			row.add(lblName);
			
			tableViewData.push(row);
		}

		$.hotspotTable.data = tableViewData;

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showHotspots");
	}
}


function getHotspotData() {
	try {
		var id = trailId;

		var hotstrailCollection = Alloy.Collections.hotspotModel;
		hotstrailCollection.fetch({
			query : 'SELECT hotspotModel.name, hotspotModel.cover_pic from hotspotModel join hotspot_trailsModel on hotspotModel.id = hotspot_trailsModel.hotspotID where trailsID ="' + id + '"'
		});

		var hotTrails = hotstrailCollection.toJSON();
		return hotTrails;
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getHotspotData");
	}

}

function showIcons() {
	try {
		var selectedIcons = getIcons();
		
		Titanium.API.info(selectedIcons);
				
		for (var i = 0; i < selectedIcons.length; i++) {
			
				var covericon = Ti.UI.createImageView({
				height : '20dp',
				width : '20dp',
				left: 10
				});
				
				covericon.image = "/icons/" + selectedIcons[i].icon;

			$.iconrow.add(covericon);
		}


	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showIcons");
	}
}

function getIcons() {
	try {
		var id = trailId;
		Titanium.API.info(id);

		var infotrailCollection = Alloy.Collections.infospotModel;
		infotrailCollection.fetch({
			query : 'SELECT icon from infospotModel join infospot_trailsModel on infospot_trailsModel.infospotID = infospotModel.id where trailsID ="' + id + '"'
		});
		
		var infoTrails = infotrailCollection.toJSON();
		Titanium.API.info(JSON.stringify(infoTrails));
		return infoTrails;
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getIcons");
	}

}

$.trailDetail.open();
