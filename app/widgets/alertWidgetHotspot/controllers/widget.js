function showDialog(){
    $.dialog.show();
};

function closeDialog(){
	$.dialog.close();
};

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};