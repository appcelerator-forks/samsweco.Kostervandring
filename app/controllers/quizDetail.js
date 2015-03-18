var args = arguments[0] || {};
try {
	var quizCollection = Alloy.Collections.quizModel;
	quizCollection.fetch();
	
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
}

function openInteractive() {
	 try {
			var interactiveWin = Alloy.createController("interactive").getView();
			Alloy.CFG.tabs.activeTab.open(interactiveWin);
			//quizQuestion.open();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}

exports.openInteractive = openInteractive;

