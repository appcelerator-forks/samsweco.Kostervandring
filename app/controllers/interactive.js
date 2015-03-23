var args = arguments[0] || {};
getClue();
// try {
// var letterCollection = Alloy.Collections.letterGameModel;
// letterCollection.fetch();
//
// //EXPORTA DENNA!!
// openNextQuestion();
//
// } catch(e) {
// newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
// }

function openNextQuestion() {
	try {
		//showQuiz();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}

exports.openNextQuestion = openNextQuestion;

function saveLetter() {
	var save = $.letter.value;
	Titanium.API.info('bokstaven: ' + save);
	$.lblSavedLetters.text = save;
}

function getClue() {
	var clueCollection = Alloy.Collections.gameLetterModel;
	clueCollection.fetch({
		query : 'SELECT infoText from gameLetterModel where id = 1'
	});

	var jsonObj = clueCollection.toJSON();
	var txt = jsonObj[0].infoText;
	
	var clue = {
 infoText : txt
 };

$.lblClue.text = txt;
	};
	// var ledtrad = clueCollection.toJSON();
	
	// Titanium.API.info('HÄR SER DU: ' + JSON.stringify(ledtrad));}



// function getClue(e) {
//
// try {
// //var id = e.rowData.id;
//
// var clueCollection = Alloy.Collections.gameLetterModel;
// clueCollection.fetch({
// query : 'SELECT infoText from gameLetterModel where id = 1'
// });
//
// var jsonObj = clueCollection.toJSON();
// var txt = jsonObj[0].infoText;
// // var name = jsonObj[0].name;
//
// var hotspotTxt = {
// // title : name,
// infoText : txt
// // id : id
// };
//
//
//
// //
// // var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
// // // hotspotDetail.open();
// // $.navwin.openWindow(hotspotDetail);
// //
// } catch(e) {
// newError("Något gick fel när sidan skulle laddas, prova igen!", "Index");
// }
//
//
// }
