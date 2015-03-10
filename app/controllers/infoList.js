var args = arguments[0] || {};

var infoCollection = Alloy.Collections.infoModel;
infoCollection.fetch();

function showinfoDetails(info) {
	Titanium.API.info(info.name);
	var selectedInfo = info.row;
	var args = {
		name : selectedInfo.name,
		infoTxt : selectedInfo.infoTxt
	};

	var infoDetail = Alloy.createController("infoDetail", args).getView();
	infoDetail.open();
	$.infoList.close();
}
