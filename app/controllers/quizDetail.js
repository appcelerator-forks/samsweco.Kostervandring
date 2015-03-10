var args = arguments[0] || {};

var quizCollection = Alloy.Collections.quizModel;
quizCollection.fetch();

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

// var quizCollection = Alloy.Collections.quizModel;
// quizCollection fetch();
// 
// Titanium.API.info(JSON.stringify(quizCollection));

function showQuestion()
{
	var quizCollection = Alloy.Collections.quizModel;
	quizCollection.fetch();
	
	query : 'SELECT question FROM quizModel where id=2';
	
	var jsonObj = quizCollection.toJSON();
	var ques = JSON.stringify(jsonObj[0].question);
	
	Titanium.API.info(jsonObj);
	
	$.visaFraga.text = ques;
	
	
	
}
