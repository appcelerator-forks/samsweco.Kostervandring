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
			img : selectedInfo.image,
			desc : selectedInfo.desc
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
			layout : 'horizontal',
			height : '80dp',
			top : 0,
			hasChild : true
		});

		var labelView = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL,
				backgroundColor : 'white',
				layout : 'vertical'
			});

		var coverimg = Ti.UI.createImageView({
			height : '80dp',
			width : '120dp',
			left : '5dp',
			image : "/pics/" + rows[i].cover_img
		});

		var lblName = Ti.UI.createLabel({
				left : 10,
				top : '2dp',
				color : '#FF9966',
				font : {
					fontSize : 13,
					fontWeight : 'bold'
				},
				text : rows[i].name
			});
			
			var lblDesc = Ti.UI.createLabel({
				left : '10dp',
				top : '2dp',
				font : {
					fontSize : 10,
				},
				text : rows[i].desc
			});
		
		labelView.add(lblName);
		labelView.add(lblDesc);
		
		row.add(coverimg);
		row.add(labelView);

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
		var desc = jsonObj[0].desc;

		var infoText = {
			name : name,
			infoTxt : txt,
			id : id,
			img : image,
			link : urllink,
			desc : desc
		};

		var infoDetail = Alloy.createController("infoDetail", infoText).getView();
		Alloy.CFG.tabs.activeTab.open(infoDetail);

	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "infoList - getInfoDetails");
	// }

}