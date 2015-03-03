function showDialog(){
    $.alertView.show();
};

function closeDialog(){
	$.alertView.visible = false;
}

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};