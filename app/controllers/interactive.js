var args = arguments[0] || {};
try {
	var quizCollection = Alloy.Collections.quizModel;
	quizCollection.fetch();
	
	//EXPORTA DENNA!!
	openNextQuestion();
	
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
}

function openNextQuestion() {
	try {
		//showQuiz();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}
exports.openNextQuestion = openNextQuestion;

function saveLetter()
{
	var save = $.letter.value;
	Titanium.API.info('bokstaven: ' + save);
	$.lblSavedLetters.text = save;
}
