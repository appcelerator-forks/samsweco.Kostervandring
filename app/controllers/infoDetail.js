var args = arguments[0] || {};
try {
	$.lblInfoTitle.text = args.name || "Title";
	$.lblInfoText.text = args.infoTxt || "Info";
	$.lblInfoLink.text = args.link || "url";
	$.infoImg.image = args.img;
	var infoid = args.id;

	var url = args.link;

	var link = $.lblInfoLink;
	link.addEventListener('click', function(e) {
		// Titanium.Platform.openURL(args.link);
		openLink(url);
	});
} catch(e) {
	newError("Något gick fel när sidan skulle laddas, prova igen!", "infoDetail - load data into labels");
}

function close(){
	$.infoDetail.close();
}

function openLink(link) {
	try {
		var webview = Titanium.UI.createWebView({
			url : link
		});
		var window = Titanium.UI.createWindow();
		window.add(webview);
		window.open({
			modal : true
		});
	} catch(e) {
		newError("Något gick fel när sidan skulle laddas, prova igen!", "infoDetail - openLink");
	}
}