var args = arguments[0] || {};

try {
	$.lblTrailName.text = args.title || 'Default Name';
	$.lblTrailLength.text = args.length + " kilometer" || 'Default Length';
	$.lblTrailColor.text = args.area || 'Default Color';
	$.lblTrailInfo.text = args.infoTxt || 'Default infoText';

	var trailId = args.id;

} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - set labels");
}

selectTrailPics();
showHotspots();
showIcons();

function showMapDetail(){
	zoomMap();
}

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
				id : rows[i].name,
				layout : 'horizontal',
				height : '60dp',
				top : 0,
				hasChild : true
			});

			var coverimg = Ti.UI.createImageView({
				height : '60dp',
				width : '90dp',
				left : 10
			});

			var lblName = Ti.UI.createLabel({
				left : 10,
				font : {
					fontSize : 12
				}
			});

			coverimg.image = rows[i].cover_pic;
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

function showHotspot(e){
	 try {
		var name = e.rowData.id;

		var hotspotCollection = Alloy.Collections.hotspotModel;
		hotspotCollection.fetch({
			query : 'SELECT id, infoTxt from hotspotModel where name = "' + name + '"'
		});

		var jsonObj = hotspotCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var idnr = jsonObj[0].id;

		Ti.API.info("hotspot : " + JSON.stringify(jsonObj));

		var hotspotTxt = {
			title : name,
			infoTxt : txt,
			id : idnr
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
		Alloy.CFG.tabs.activeTab.open(hotspotDetail);

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showHotspot");
	}
}

function showIcons() {
	try {
		var selectedIcons = getIcons();

		for (var i = 0; i < selectedIcons.length; i++) {

			var covericon = Ti.UI.createImageView({
				height : '30dp',
				width : '30dp',
				left : 10
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


