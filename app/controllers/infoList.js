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
			font : {
				fontSize : 12
			}
		});

		coverimg.image = "/pics/" + rows[i].cover_img;
		lblName.text = rows[i].name;

		verticalView.add(lblName);
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
		Ti.API.info("infoid : " + id);

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
		
		
		Ti.API.info("infodetaljer : " + JSON.stringify(infoText));

		var infoDetail = Alloy.createController("infoDetail", JSON.stringify(infoText)).getView();
		Ti.API.info("Skickas : " + JSON.stringify(infoDetail));
		// $.navWinInfo.openWindow(infoDetail);

	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - getInfoDetails");
	// }

}