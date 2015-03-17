var args = arguments[0] || {};

setRowData();

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
		// $.infoList.close();
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
			id : i + 1,
			height : '80dp',
			top : 0,
			hasChild : true
		});

		var listItem = Ti.UI.createView({
			height : '80dp',
			layout : 'horizontal'
		});

		var verticalView = Ti.UI.createView({
			layout : 'vertical'
		});

		var coverimg = Ti.UI.createImageView({
			height : '80dp',
			width : '90dp',
			left : 10
		});

		var lblName = Ti.UI.createLabel({
				left : 10,
				top : '2dp',
				color : '#FF9966',
				font : {
					fontSize : 13,
					fontWeight : 'bold'
				}
			});
			
			var lblDesc = Ti.UI.createLabel({
				left : 10,
				top : '2dp',
				font : {
					fontSize : 11,
				}
			});
			
		coverimg.image = "/pics/" + rows[i].cover_img;
		lblName.text = rows[i].name;
		lblDesc.text = rows[i].desc;

		verticalView.add(lblName);
		verticalView.add(lblDesc);
		listItem.add(coverimg);
		listItem.add(verticalView);

		row.add(listItem);
		tableViewData.push(row);
	}
	$.table.data = tableViewData;
}

function getInfoDetails(e) {

	// try {
		var id = e.rowData.id;

		var infoCollection = Alloy.Collections.infoModel;
		infoCollection.fetch({
			query : 'SELECT * from infoModel where id = "' + id + '"'
		});

		var jsonObj = infoCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var name = jsonObj[0].name;
		var image = jsonObj[0].cover_img;
		var urllink = jsonObj[0].url;

		var infoText = {
			title : name,
			infoTxt : txt,
			id : id,
			img : image,
			link : urllink
		};

		var infoDetail = Alloy.createController("infoDetail", infoText).getView();
		infoDetail.open();

	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - getInfoDetails");
	// }

}