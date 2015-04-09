var args = arguments[0] || {};

//-----------------------------------------------------------
// Args från trails - klick på item i listan
//-----------------------------------------------------------
try {
	$.hikeDetailWin.title = args.title;
	$.lblTrailName.text = args.title || 'Default Name';
	$.lblTrailLength.text = args.length + " kilometer" || 'Default Length';
	$.lblTrailArea.text = args.area || 'Default Color';
	$.lblTrailInfo.text = args.infoTxt || 'Default infoText';

	var trailId = args.id;
	globalTrailID = trailId;

} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - set labels");
}

//-----------------------------------------------------------
// hämtar info för den vandringsled som ska öppnas i detaljvy
//-----------------------------------------------------------
function zoomMapTrail() {
	var trail = {
		id : args.id,
		title : args.title,
		color : args.color,
		zoomlat : args.zoomlat,
		zoomlon : args.zoomlon
	};
	var mapDetail = Alloy.createController("mapDetail", trail).getView();
	Alloy.CFG.tabs.activeTab.open(mapDetail);
}

selectTrailPics();
showHotspots();
showIcons();

//-----------------------------------------------------------
// Hämtar bilder till bildspel för den valda vandringsleder
//-----------------------------------------------------------
function selectTrailPics() {
	try {
		var mediaCollection = Alloy.Collections.mediaModel;
		mediaCollection.fetch({
			query : 'SELECT * from mediaModel where trail_id="' + trailId + '"'
		});

		var jsonMedia = mediaCollection.toJSON();
		for (var i = 0; i < jsonMedia.length; i++) {

			var img_view = Ti.UI.createView({
				backgroundImage : "/pics/" + jsonMedia[i].filename,
				height : '200dp',
				width : '300dp',
				top : '0dp'
			});

			var lblImgTxt = Ti.UI.createLabel({
				left : '5dp',
				top : '0dp',
				text : jsonMedia[i].img_txt,
				color : 'white',
				font : {
					fontSize : 12,
					fontStyle : 'italic',
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
				},

			});

			var backgroundView = Ti.UI.createView({
				layout : 'vertical',
				backgroundColor : 'black',
				height : Ti.UI.SIZE,
				width : Ti.UI.SIZE
			});

			backgroundView.add(img_view);
			backgroundView.add(lblImgTxt);

			$.slideShowTrails.addView(backgroundView);
			//$.slideShowHotspotDetail.add(lblImgTxt);
		}
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - selectTrailPics");
	}

}

//-----------------------------------------------------------
// Visar hotspots för en vald vandringsled
//-----------------------------------------------------------
function showHotspots() {
	try {
		var tableViewData = [];
		var rows = getHotspotData();

		for (var i = 0; i < rows.length; i++) {
			var row = Ti.UI.createTableViewRow({
				id : rows[i].name,
				layout : 'horizontal',
				height : '80dp',
				top : '0dp',
				hasChild : true
			});

			var img = Ti.UI.createImageView({
				height : '80dp',
				width : '120dp',
				image : '/pics/' + rows[i].cover_pic,
				left : '5dp'
			});

			var labelView = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				backgroundColor : 'white',
				layout : 'vertical'
			});

			var lblName = Ti.UI.createLabel({
				color : '#FF9966',
				left : '5dp',
				font : {
					fontSize : 13,
					fontWeight : 'bold'
				},
				text : rows[i].name
			});

			var lblDesc = Ti.UI.createLabel({
				left : '5dp',
				top : '0dp',
				font : {
					fontSize : 10
				},
				text : 'Läs mer om ' + rows[i].name + " här!"
			});

			labelView.add(lblName);
			labelView.add(lblDesc);

			row.add(img);
			row.add(labelView);

			tableViewData.push(row);
		}

		$.hotspotTable.data = tableViewData;

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showHotspots");
	}
}

//-----------------------------------------------------------
// Hämtar data för hotspots som hör till den valda vandringsleden
//-----------------------------------------------------------
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

//-----------------------------------------------------------
// Öppnar detaljvy med vald hotspot - klickad på i kartvyn
//-----------------------------------------------------------
function showHotspot(e) {
	try {
		var name = e.rowData.id;

		var hotspotCollection = Alloy.Collections.hotspotModel;
		hotspotCollection.fetch({
			query : 'SELECT id, infoTxt from hotspotModel where name = "' + name + '"'
		});

		var jsonObj = hotspotCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var idnr = jsonObj[0].id;

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

//-----------------------------------------------------------
// Sätter ut ikoner i kartvyn.
//-----------------------------------------------------------
function showIcons() {
	try {
		var selectedIcons = getIcons();

		for (var i = 0; i < selectedIcons.length; i++) {

			var covericon = Ti.UI.createImageView({
				height : '30dp',
				width : '30dp',
				left : '0dp',
				top : '10dp',
				image : '/images/' + selectedIcons[i].icon
			});

			$.iconrow.add(covericon);
		}

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showIcons");
	}
}

//-----------------------------------------------------------
// Hämtar ikoner till vald vandringsled
//-----------------------------------------------------------
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

