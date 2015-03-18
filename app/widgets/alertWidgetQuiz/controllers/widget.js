

function showDialog(){
    $.dialog.show();
};
exports.showDialog = showDialog;


function closeDialog(){
	$.dialog.close();
};

function openQuestion(e){
    Ti.API.info('e.text: ' + e.text);
    var quizDetail = Alloy.createController('quizDetail').getView();
	$.quizWin.add(quizDetail);
};






