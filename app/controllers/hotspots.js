var args = arguments[0] || {};

$.hotspots.open();
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
			infoTxt : selectedHotspot.infoTxt,
			xkoord : selectedHotspot.xkoord,
			ykoord : selectedHotspot.ykoord
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
		
		var lblPlace = Ti.UI.createLabel({
			left : 10,
			font : {
				fontSize : 12
			}
		});

		// var iconView = showIcons(rows[i].id);
		coverimg.image = "/pics/"+rows[i].cover_pic;
		lblName.text = rows[i].name;
		lblPlace.text = "Nordkoster";
		// var hotsid = rows[i].id;

		verticalView.add(lblName);
		verticalView.add(lblPlace);
		listItem.add(coverimg);
		// verticalView.add(iconView);
		listItem.add(verticalView);

		row.add(listItem);

		// tableViewData.push(row, {hasChild:true, id:trailid});
		tableViewData.push(row);
	}

	$.table.data = tableViewData;

}

