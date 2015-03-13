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

		var infoCollection = Alloy.Collections.infoModel;
		infoCollection.fetch({
			query : 'SELECT name, infoTxt from infoModel where id = 5'
		});
		//OBS OBS id't nedan måste vara det för Kosterhavets Nationalpark i infoModel i DB för att detta ska funka!

		var jsonObj = infoCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var name = jsonObj[0].name;

		var infoTxtNaturum = {
			title : name,
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

		var infoCollection = Alloy.Collections.infoModel;
		infoCollection.fetch({
			query : 'SELECT name, infoTxt from infoModel where id = 1'
		});
		var jsonObj = infoCollection.toJSON();
		var txt = jsonObj[0].infoTxt;
		var name = jsonObj[0].name;

		var infoTxtKoster = {
			title : name,
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

