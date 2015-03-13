var args = arguments[0] || {};



try {
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "trails - create trailsCollection");
}

//setIconsTrails(); 
//FUNKAR EJ!!

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

function setIconsTrails(){
	var trailsCollection = Alloy.Collections.trailsModel;
	trailsCollection.fetch();
	
	for (var i = 0; i < trailsCollection.length; i++){
		showIcons(i+1);
	}
}

function showIcons(id) {
	//try {
		var trail_id = id;
		var selectedIcons = getIcons(trail_id);
		
	//	Ti.API.info("Selected icons ---> "+JSON.stringify(selectedIcons));	
		
		//selectedIcons.toJSON();
						
		for (var i = 0; i < selectedIcons.length; i++) {
	//				Ti.API.info("I loopen -->"+JSON.stringify(selectedIcons));	
							Ti.API.info(selectedIcons);	
				
				var iconImgView = Ti.UI.createImageView({
				height : '30dp',
				width : '30dp',
				left: 10
				});
				
				iconImgView.image = "/piktogram/" + selectedIcons[i].icon;

			$.iconView.add(iconImgView);
		}
// function showIcons() {
	// try {
		// var selectedIcons = getIcons();
// 				
		// for (var i = 0; i < selectedIcons.length; i++) {
// 			
				// var covericon = Ti.UI.createImageView({
				// height : '30dp',
				// width : '30dp',
				// left: 10
				// });
// 				
				// covericon.image = "/piktogram/" + selectedIcons[i].icon;
// 
			// $.iconrow.add(covericon);
		// }
// 
// 
	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - showIcons");
	// }
// }

}

function getIcons(trail_id) {
	try {
		var id = trail_id;

		var infotrailCollection = Alloy.Collections.infospotModel;
		infotrailCollection.fetch({
			query : 'SELECT icon from infospotModel join infospot_trailsModel on infospot_trailsModel.infospotID = infospotModel.id where trailsID ="' + id + '"'
		});
		
		var infoTrails = infotrailCollection.toJSON();
		
		//Ti.API.info(JSON.stringify(infoTrails));
		
		return infoTrails;
		
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "trailDetail - getIcons");
	}

}


function destroyModel() {
	$.destroy();
}
