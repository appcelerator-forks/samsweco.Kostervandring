var args = arguments[0] || {};

try {
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - create trailsCollection");
}

function showTrailDetails(trail) {
	try {
		var selectedTrail = trail.row;
		var args = {
			id : selectedTrail.trailNo,
			title : selectedTrail.name,
			length : selectedTrail.length,
			infoTxt : selectedTrail.infoTxt,
			color : selectedTrail.color
		};
		
		var trailDetail = Alloy.createController("trailDetail", args).getView();
		trailDetail.open();
		$.trails.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - showTrailDetail");
	}

}

function destroyModel() {
	$.destroy();
}
