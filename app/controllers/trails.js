var args = arguments[0] || {};

var trailsCollection = Alloy.Collections.trailsModel;
trailsCollection.fetch();

function showTrailDetails(trail)
{
	var selectedTrail = trail.row;
	var args = {
		id : selectedTrail.trailNo,
		title: selectedTrail.name,
		length: selectedTrail.length,
		infoTxt : selectedTrail.infoTxt,
		color: selectedTrail.color
	};
		
	var trailDetail = Alloy.createController("trailDetail", args).getView();
	trailDetail.open();
	$.trails.close();
}

function destroyModel(){
	$.destroy();
}
