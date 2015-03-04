
function nextPage(){
	var trails = Alloy.createController("trails").getView();
	trails.open();
}

function hotspotView(){
	var hotspots = Alloy.createController("hotspots").getView();
	hotspots.open();
}

function aboutNaturum(){
	
	var hotspotCollection = Alloy.Collections.hotspotModel;
	//OBS OBS id't nedan måste vara det för Kosterhavets Nationalpark i hotspotModel i DB för att detta ska funka!
	hotspotCollection.fetch({query: 'SELECT infoTxt from hotspotModel where id = 13'});
	var jsonObj = hotspotCollection.toJSON();	
	var txt = jsonObj[0].infoTxt;
	Titanium.API.info(txt);
	
		var infoTxtNaturum = {
		informationNaturum : txt
		};

	var hotspotDetail = Alloy.createController("hotspotDetail", infoTxtNaturum).getView();
	hotspotDetail.open();
	$.index.close();
}

function aboutKoster(){
	
	var hotspotCollection = Alloy.Collections.hotspotModel;
	//OBS OBS id't nedan måste vara det för Naturum i db för hotspotModel i DB för att detta ska funka!
	hotspotCollection.fetch({query: 'SELECT infoTxt from hotspotModel where id= 14'});
	var jsonObj = hotspotCollection.toJSON();	
	var txt = jsonObj[0].infoTxt;
	Titanium.API.info(txt);
	
		var infoTxtKoster = {
		informationKoster : txt
		};

	var hotspotDetail = Alloy.createController("hotspotDetail", infoTxtKoster).getView();
	hotspotDetail.open();
	$.index.close();
}



$.index.open();

