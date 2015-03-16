var args = arguments[0] || {};

//$.trailDetail.open();

try {
	$.lblTrailName.text = args.title || 'Default Name'; //"Vandringsled : " + 
	$.lblTrailLength.text = args.length + " kilometer" || 'Default Length'; //"Distans: " + 
	$.lblTrailColor.text = args.color || 'Default Color'; //"Färgmarkering: " + 
	$.lblTrailInfo.text = args.infoTxt || 'Default infoText'; // "Beskrivning : " + 

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
				id : i + 1,
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

			coverimg.image = "/pics/" + rows[i].cover_pic;
			lblName.text = rows[i].name;

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
				
		for (var i = 0; i < selectedIcons.length; i++) {
			
				var covericon = Ti.UI.createImageView({
				height : '30dp',
				width : '30dp',
				left: 10
				});
				
				covericon.image = "/piktogram/" + selectedIcons[i].icon;

			$.iconrow.add(covericon);
		}


	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showIcons");
	}
}

function getIcons() {
	try {
		var id = trailId;

		var infotrailCollection = Alloy.Collections.infospotModel;
		infotrailCollection.fetch({
			query : 'SELECT icon from infospotModel join infospot_trailsModel on infospot_trailsModel.infospotID = infospotModel.id where trailsID ="' + id + '"'
		});
		
		var infoTrails = infotrailCollection.toJSON();
		return infoTrails;
		
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getIcons");
	}

}


