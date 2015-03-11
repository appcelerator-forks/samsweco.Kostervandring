function nextPage() {

	try {
		var trails = Alloy.createController("trails").getView();
		trails.open();
		$.index.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - nextPage");
	}

}

function hotspotView() {
	try {
		
		var hotspots = Alloy.createController("hotspots").getView();
		hotspots.open();
		
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - hotspotView");
	}

}

function quizView() {
	try {
		var quiz = Alloy.createController("quizDetail").getView();
		quiz.open();
		$.index.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - quizView");
	}
}

function showError() {

	newError("Nu gick något fel när du tryckte på knappen!", "Index - showError");
}

function aboutNaturum() {

	try {
		var hotspotCollection = Alloy.Collections.hotspotModel;
		//OBS OBS id't nedan måste vara det för Kosterhavets Nationalpark i hotspotModel i DB för att detta ska funka!
		hotspotCollection.fetch({
			query : 'SELECT infoTxt from hotspotModel where id = 13'
		});
		var jsonObj = hotspotCollection.toJSON();
		var txt = JSON.stringify(jsonObj[0].infoTxt);
		Titanium.API.info(txt);

		var infoTxtNaturum = {
			informationNaturum : txt
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", infoTxtNaturum).getView();
		hotspotDetail.open();
		$.index.close();

	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index");
	}

}

function aboutKoster() {

	try {

		var hotspotCollection = Alloy.Collections.hotspotModel;
		//OBS OBS id't nedan måste vara det för Naturum i db för hotspotModel i DB för att detta ska funka!
		hotspotCollection.fetch({
			query : 'SELECT infoTxt from hotspotModel where id= 14'
		});
		var jsonObj = hotspotCollection.toJSON();
		var txt = JSON.stringify(jsonObj[0].infoTxt);
		Titanium.API.info(txt);

		var infoTxtKoster = {
			informationKoster : txt
		};

		var hotspotDetail = Alloy.createController("hotspotDetail", infoTxtKoster).getView();
		hotspotDetail.open();
		$.index.close();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - aboutKoster");
	}
}

$.index.open();

