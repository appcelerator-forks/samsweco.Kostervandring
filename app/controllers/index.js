
var hotspotCollection = Alloy.Collections.hotspotModel;
hotspotCollection.fetch();

function nextPage(){
	var trails = Alloy.createController("trails").getView();
	trails.open();

}

$.index.open();

