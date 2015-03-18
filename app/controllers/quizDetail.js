var args = arguments[0] || {};
try {
	var quizCollection = Alloy.Collections.quizModel;
	quizCollection.fetch();
	
	openQuiz();
	
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - create quizCollection");
}

// <!-- controllers/index.js -->
$.lista.addEventListener('itemclick', function(e) {
	var item = $.section.getItemAt(e.itemIndex);
	if (item.properties.accessoryType == Ti.UI.LIST_ACCESSORY_TYPE_NONE) {
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_CHECKMARK;
		item.properties.color = 'black';
	} else {
		item.properties.accessoryType = Ti.UI.LIST_ACCESSORY_TYPE_NONE;
		item.properties.color = 'black';
	}
	$.section.updateItemAt(e.itemIndex, item);
});

function openQuiz() {
	try {
		$.viewFraga.visible = true;
		$.spela.visible = false;
		showQuiz();
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - openQuiz");
	}
}

exports.openQuiz = openQuiz;

function showQuiz() {
	try {
		var answerCollection = Alloy.Collections.quizModel;
		answerCollection.fetch({
			query : 'SELECT alt1, alt2, alt3, question, answer FROM quizModel WHERE id = 2;'
		});

		var jsonObj = answerCollection.toJSON();
		var alt1 = jsonObj[0].alt1;
		var alt2 = jsonObj[0].alt2;
		var alt3 = jsonObj[0].alt3;
		var answer = jsonObj[0].answer;
		var question = jsonObj[0].question;

		$.visaFraga.text = question;
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "quizDetail - showQuiz");
	}

}
