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
	$.lblSavedLetters.text = '';

	if ($.letter.value == "") {
		alert("Fyll i den bokstav du hittat");
	}
	else if ($.letter.value >= 2)
	{	
	alert ("Du får enbart fylla i en bokstav");
	}
	else {
		for (var i = 0; i < lettersArray.length; i++) {

			$.lblSavedLetters.text += lettersArray[i];
		}
	}
	$.lblSavedLetters.text = '';

	for (var i = 0; i < lettersArray.length; i++) {
		$.lblSavedLetters.text += lettersArray[i];
	}

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

