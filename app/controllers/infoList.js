var args = arguments[0] || {};

setRowData()

try {
	var infoCollection = Alloy.Collections.infoModel;
	infoCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - create infoCollection");
}

function showinfoDetails(info) {
	try {
		var selectedInfo = info.row;
		var args = {
			name : selectedInfo.name,
			infoTxt : selectedInfo.infoTxt,
			link : selectedInfo.link,
			img : selectedInfo.image
		};

		var infoDetail = Alloy.createController("infoDetail", args).getView();
		infoDetail.open();
		$.infoList.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "infoDetail - showInfoDetail");
	}

}

function setRowData() {

	var infoCollection = Alloy.Collections.infoModel;
	infoCollection.fetch();

	var tableViewData = [];
	var rows = infoCollection.toJSON();

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
		
		// var lblPlace = Ti.UI.createLabel({
			// left : 10,
			// font : {
				// fontSize : 12
			// }
		// });

		// var iconView = showIcons(rows[i].id);
		coverimg.image = "/pics/"+rows[i].cover_img;
		lblName.text = rows[i].name;
		// lblPlace.text = "Nordkoster";
		// var hotsid = rows[i].id;

		verticalView.add(lblName);
		// verticalView.add(lblPlace);
		listItem.add(coverimg);
		// verticalView.add(iconView);
		listItem.add(verticalView);

		row.add(listItem);

		// tableViewData.push(row, {hasChild:true, id:trailid});
		tableViewData.push(row);
	}

	$.table.data = tableViewData;

}
