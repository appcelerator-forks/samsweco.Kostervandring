$.tabs.open();

Alloy.CFG.tabs = $.tabs;

exports.toQuiz = toQuiz;

function hotspotView() {
	try {
		var hotspots = Alloy.createController("hotspots").getView();
		hotspots.open();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - hotspotView");
	}
 }
 exports.hotspotView = hotspotView;

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
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "Index - aboutKoster");
	}
}

//------------------
//Knapparna i menyn

function toMap() {
	var mapWind = Alloy.createController('map').getView();
	$.mapWin.add(mapWind);
}

function toQuiz() {
	var quizDetail = Alloy.createController('quizDetail').getView();
	$.quizWin.add(quizDetail);
}


function toTrails() {
	var trails = Alloy.createController('trails').getView();
	$.hikeWin.add(trails);
}

function toInfo() {
	var info = Alloy.createController('infoList').getView();
	$.infoWin.add(info);
}
