var args = arguments[0] || {};

try {
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - create trailsCollection");
}

setRowData();

//setIconsTrails();
//FUNKAR EJ!!

// function setIconsTrails() {
	// var trailsCollection = Alloy.Collections.trailsModel;
	// trailsCollection.fetch();
// 
	// for (var i = 0; i < trailsCollection.length; i++) {
		// showIcons(i + 1);
	// }
// }

function setRowData() {

	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();

	var tableViewData = [];
	var rows = trailsCollection.toJSON();

	for (var i = 0; i < rows.length; i++) {
		var row = Ti.UI.createTableViewRow({
			height : '80dp',
			top : 0
		});

		var listItem = Ti.UI.createView({
			height : '60dp',
			layout : 'horizontal'

		});
		var verticalView = Ti.UI.createView({
			layout : 'vertical'
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
		var lblDistance = Ti.UI.createLabel({
			left : 10,
			font : {
				fontSize : 12
			}
		});

		var iconView = showIcons(rows[i].id);
		coverimg.image = "/pics/"+rows[i].cover_img;
		lblName.text = rows[i].name;
		lblDistance.text = rows[i].length +" km";

		verticalView.add(lblName);
		verticalView.add(lblDistance);
		listItem.add(coverimg);
		verticalView.add(iconView);
		listItem.add(verticalView);

		row.add(listItem);

		tableViewData.push(row);
	}

	$.table.data = tableViewData;

}

function showTrailDetails(trail) {
	try {
		var selectedTrail = trail.row;
		var args = {
			id : selectedTrail.trailNo,
			title : selectedTrail.name,
			length : selectedTrail.length,
			infoTxt : selectedTrail.infoTxt,
			color : selectedTrail.color
		};

		var trailDetail = Alloy.createController("trailDetail", args).getView();
		trailDetail.open();
		$.trails.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - showTrailDetail");
	}

}

function showIcons(id) {
	var trail_id = id;
	var selectedIcons = getIcons(trail_id);
	
	var iconView = Ti.UI.createView({
			layout : 'horizontal',
			height : '40dp'

		});

	for (var i = 0; i < selectedIcons.length; i++) {

		var iconImgView = Ti.UI.createImageView({
			height : '30dp',
			width : '30dp',
			left : 10
		});

		iconImgView.image = "/piktogram/" + selectedIcons[i].icon;
		iconView.add(iconImgView);
		
	}
		Ti.API.info(JSON.stringify(iconView));
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

		Ti.API.info(JSON.stringify(infoTrails));

		return infoTrails;

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getIcons");
	}

}

function destroyModel() {
	$.destroy();
}
