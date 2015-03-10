var args = arguments[0] || {};

var infoCollection = Alloy.Collections.infoModel;
infoCollection.fetch();

function showinfoDetails(info) {
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
}
