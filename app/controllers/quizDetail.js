var args = arguments[0] || {};
try {
	var letterCollection = Alloy.Collections.letterGameModel;
	letterCollection.fetch();
	
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
}

function openInteractive() {
	 try {
			var interactiveWin = Alloy.createController("interactive").getView();
			Alloy.CFG.tabs.activeTab.open(interactiveWin);
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}

exports.openInteractive = openInteractive;

