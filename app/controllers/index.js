
function nextPage(){
	var trails = Alloy.createController("trails").getView();
	trails.open();
}

function hotspotView(){
	var hotspots = Alloy.createController("hotspots").getView();
	hotspots.open();
}

$.index.open();

