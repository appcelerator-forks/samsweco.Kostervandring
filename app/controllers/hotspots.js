var args = arguments[0] || {};

setRowData();

try {
	var hotspotCollection = Alloy.Collections.hotspotModel;
	hotspotCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "Hotspots - create hotspotCollection");
}

function showHotspotDetails(hotspot) {
	try {
		var selectedHotspot = hotspot.row;
		var args = {
			id : selectedHotspot.number,
			title : selectedHotspot.name,
			infoTxt : selectedHotspot.infoTxt
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", args).getView();
		hotspotDetail.open();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - showHotspotDetails");
	}
}

function setRowData() {

	var hotspotCollection = Alloy.Collections.hotspotModel;
	hotspotCollection.fetch();

	var tableViewData = [];
	var rows = hotspotCollection.toJSON();

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

		var lblPlace = Ti.UI.createLabel({
			left : 10,
			font : {
				fontSize : 11
			}
		});

		var id = rows[i].id;
		coverimg.image = rows[i].cover_pic;
		lblName.text = rows[i].name;
		lblPlace.text = "Nordkoster";

		verticalView.add(lblName);
		verticalView.add(lblPlace);
		listItem.add(coverimg);
		listItem.add(verticalView);

		row.add(listItem);
		tableViewData.push(row);
	}

	$.table.data = tableViewData;
}

function getHotspotInfo(e) {

	try {
		var id = e.rowData.id;

		var hotspotCollection = Alloy.Collections.hotspotModel;
		hotspotCollection.fetch({
			query : 'SELECT name, infoTxt from hotspotModel where id = "' + id + '"'
		});

		var jsonObj = hotspotCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var name = jsonObj[0].name;

		var hotspotTxt = {
			title : name,
			infoTxt : txt,
			id : id
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
		hotspotDetail.open();

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index");
	}

}
