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
				id : i + 1,
				height : '80dp',
				top : 0,
				hasChild : true
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
					fontSize : 13
				}
			});
			var lblDistance = Ti.UI.createLabel({
				left : 10,
				font : {
					fontSize : 11
				}
			});

			var iconView = showIcons(rows[i].id);
			coverimg.image = "/pics/" + rows[i].cover_img;
			lblName.text = rows[i].name;
			lblDistance.text = rows[i].length + " km";

			verticalView.add(lblName);
			verticalView.add(lblDistance);
			listItem.add(coverimg);
			verticalView.add(iconView);
			listItem.add(verticalView);

			row.add(listItem);

			tableViewData.push(row);
		}

		$.table.data = tableViewData;
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - setRowData");
	}

}

// function showTrailDetails(trail_id) {
// // try {
// var trailsCollection = Alloy.Collections.trailsModel;
// trailsCollection.fetch({
// query : 'SELECT *  FROM trailsModel where id ="' + trail_id + '"'
// });
//
// //trailsCollection.JSON();
//
// var args = {
// id : trailsCollection.id,
// title : trailsCollection.name,
// length : trailsCollection.length,
// infoTxt : trailsCollection.infoTxt,
// color : trailsCollection.color
// };
//
// var trailDetail = Alloy.createController("trailDetail", args).getView();
// $.hikeWin.add(trailDetail);
// $.hikeWin.open();
// // } catch(e) {
// // newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - showTrailDetail");
// // }
//
// }

function showTrailDetails(e) {

	try {
		var id = e.rowData.id;
		Ti.API.info("trailid : " + id);

		var trailsCollection = Alloy.Collections.trailsModel;
		trailsCollection.fetch({
			query : 'SELECT * FROM trailsModel where id ="' + id + '"'
		});

		var jsonObj = trailsCollection.toJSON();
		var name = jsonObj[0].name;
		var traillength = jsonObj[0].length;
		var infoText = jsonObj[0].infoTxt;
		var trailcolor = jsonObj[0].color;

		var args = {
			id : id,
			title : name,
			length : traillength,
			infoTxt : infoText,
			color : trailcolor
		};

		Ti.API.info("Traildetaljer : " + JSON.stringify(args));

		var trailDetail = Alloy.createController("trailDetail", args).getView();
		// $.tabGroup.hikeTab.open(trailDetail);
		trailDetail.open();

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Trails - showTrailDetails");
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
