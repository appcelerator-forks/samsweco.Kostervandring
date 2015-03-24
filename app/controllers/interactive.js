var args = arguments[0] || {};
var id = 1;
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
	stor = save.toUpperCase();
	$.lblSavedLetters.text = '';

	if (save == "") {
		alert("Fyll i den bokstav du hittat");
	}
	if (save.length > 1) {
		alert("Du får enbart fylla i en bokstav");
	} else {
		lettersArray.push(stor);
		for (var i = 0; i < lettersArray.length; i++) {

			$.lblSavedLetters.text += lettersArray[i];
		}
	}
}

function getClue() {

	var clueCollection = Alloy.Collections.gameLetterModel;
	clueCollection.fetch({
		query : 'SELECT infoText from gameLetterModel where id ="' + id + '"'
	});

	var jsonObj = clueCollection.toJSON();
	var txt = jsonObj[0].infoText;

	var clue = {
		infoText : txt
	};

	$.lblClue.text = txt;
	id++;
};
