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
	lettersArray.push(save);
	 // for (i=0; i < lettersArray; i++)
	 // {
	 // // HÄT BÖR DU SKRIVA NÅGOT!!!!!
	 // }
	Titanium.API.info('detta finns i arrayen: ' + lettersArray);
	$.lblSavedLetters.text = lettersArray;
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



