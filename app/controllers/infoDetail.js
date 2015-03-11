var args = arguments[0] || {};


$.lblInfoTitle.text = args.name || "Title";
$.lblInfoText.text = args.infoTxt || "Info";
$.lblInfoLink.text = args.link || "url";
$.infoImg.image = args.img;

var url = args.link;

var link = $.lblInfoLink;
link.addEventListener('click', function(e) {
    // Titanium.Platform.openURL(args.link);
    openLink(url);
});

function openLink(link){
  var webview = Titanium.UI.createWebView({url:link});
    var window = Titanium.UI.createWindow();
    window.add(webview);
    window.open({modal:true});
   }