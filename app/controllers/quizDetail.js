var args = arguments[0] || {};
try {
	var quizCollection = Alloy.Collections.quizModel;
	quizCollection.fetch();
	
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
}

function openQuizQuestion() {
	try {
			var quizQuestion = Alloy.createController("quizQuestion").getView();
			quizQuestion.open();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}

exports.openQuizQuestion = openQuizQuestion;

