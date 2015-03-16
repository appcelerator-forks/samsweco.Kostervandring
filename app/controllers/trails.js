var args = arguments[0] || {};

try {
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - create trailsCollection");
}

setRowData();

function setRowData() {

<<<<<<< HEAD
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();

	var tableViewData = [];
	var rows = trailsCollection.toJSON();

	for (var i = 0; i < rows.length; i++) {
		var row = Ti.UI.createTableViewRow({
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
		var trailid = rows[i].id;

		verticalView.add(lblName);
		verticalView.add(lblDistance);
		listItem.add(coverimg);
		verticalView.add(iconView);
		listItem.add(verticalView);

		row.add(listItem);

		// tableViewData.push(row, {hasChild:true, id:trailid});
		tableViewData.push(row);
=======
	try {

		var trailsCollection = Alloy.Collections.trailsModel;
		trailsCollection.fetch();

		var tableViewData = [];
		var rows = trailsCollection.toJSON();

		for (var i = 0; i < rows.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height : '80dp',
				top : 0
			});
			
			row.addEventListener('click', function(e){
				showTrailDetails(rows[i]+1);
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
					fontSize : 14
				}
			});
			var lblDistance = Ti.UI.createLabel({
				left : 10,
				font : {
					fontSize : 12
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
>>>>>>> origin/master
	}

}

function showTrailDetails(trail_id) {
	// try {
		var trailsCollection = Alloy.Collections.trailsModel;
		trailsCollection.fetch({
			query : 'SELECT *  FROM trailsModel where id ="' + trail_id + '"'
		});
		
		//trailsCollection.JSON();
		
		var args = {
			id : trailsCollection.id,
			title : trailsCollection.name,
			length : trailsCollection.length,
			infoTxt : trailsCollection.infoTxt,
			color : trailsCollection.color
		};


		var trailDetail = Alloy.createController("trailDetail", args).getView();
		$.hikeWin.add(trailDetail);
		$.hikeWin.open();
	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - showTrailDetail");
	// }

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
