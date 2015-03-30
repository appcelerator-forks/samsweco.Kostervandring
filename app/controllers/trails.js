var args = arguments[0] || {};

try {
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - create trailsCollection");
}

setRowData();

function setRowData() {

	try {
		var trailsCollection = Alloy.Collections.trailsModel;
		trailsCollection.fetch();

		var tableViewData = [];
		var rows = trailsCollection.toJSON();

		for (var i = 0; i < rows.length; i++) {
			
			var row = Ti.UI.createTableViewRow({
				layout : 'horizontal',
				id : i + 1,
				height : '200dp',
				top : '0dp',
				hasChild : true
			});

			// var listItem = Ti.UI.createView({
				// layout : 'horizontal'
			// });
			var verticalView = Ti.UI.createView({
				layout : 'vertical'
			});

			var coverimg = Ti.UI.createImageView({
				width : '100dp',
				height : '66dp',
				left : '10dp'
			});
			var lblName = Ti.UI.createLabel({
				left : '10dp',
				top : '2dp',
				color : '#FF9966',
				font : {
					fontSize : 13,
					fontWeight : 'bold'
				}
			});
			var lblDistance = Ti.UI.createLabel({
				left : '10dp',
				top : '0dp',
				font : {
					fontSize : 11
				}
			});
			var lblColor = Ti.UI.createLabel({
				left : '10dp',
				top : '0dp',
				font : {
					fontSize : 11
				}
			});

			var iconView = showIcons(rows[i].id);
			
			coverimg.image = "/pics/" + rows[i].cover_img;
			lblName.text = rows[i].name;
			lblDistance.text = 'Sträcka : ' + rows[i].length + " km";
			lblColor.text = rows[i].area;
			
			verticalView.add(iconView);
			verticalView.add(lblName);
			verticalView.add(lblColor);
			verticalView.add(lblDistance);
			
			row.add(coverimg);
			row.add(verticalView);

			tableViewData.push(row);
		}
		
		$.table.data = tableViewData;
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - setRowData");
	}
}

function showTrailDetails(e) {

	 try {
		var id = e.rowData.id;
		
		var trailsCollection = Alloy.Collections.trailsModel;
		trailsCollection.fetch({
			query : 'SELECT * FROM trailsModel where id ="' + id + '"'
		});

		var jsonObj = trailsCollection.toJSON();

	var args = {
		id : id,
		title : jsonObj[0].name,
		length : jsonObj[0].length,
		infoTxt : jsonObj[0].infoTxt,
		area : jsonObj[0].area,
		zoomlat : jsonObj[0].zoomLat,
		zoomlon : jsonObj[0].zoomLon,
		color : jsonObj[0].color,
		jsonfile : jsonObj[0].JSONfile
	};

	var trailDetail = Alloy.createController("trailDetail", args).getView();
	Alloy.CFG.tabs.activeTab.open(trailDetail);

	} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "Trails - showTrailDetails");
	}
}


function showIcons(id) {
	var trail_id = id;
	var selectedIcons = getIcons(trail_id);

	var iconView = Ti.UI.createView({
		layout : 'horizontal',
		height : '30dp',
		backgroundColor : 'black',
		top : '5dp',
		left : '10dp'

	});

	for (var i = 0; i < selectedIcons.length; i++) {

		var iconImgView = Ti.UI.createImageView({
			height : '25dp',
			width : '25dp',
			left : '0dp'
		});

		iconImgView.image = "/piktogram/" + selectedIcons[i].icon;
		iconView.add(iconImgView);
	}
	return iconView;
}

function getIcons(trail_id) {
	try {
		var id = trail_id;

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

function destroyModel() {
	$.destroy();
}
