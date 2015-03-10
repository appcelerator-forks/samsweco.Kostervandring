var args = arguments[0] || {};


$.lblInfoTitle.text = args.name || "Title";
$.lblInfoText.text = args.infoTxt || "Info";
$.lblInfoLink.text = args.link || "url";

$.infoImg.image = args.img;

var link = $.lblInfoLink;
link.addEventListener('click', function(e) {
    Titanium.Platform.openURL(args.link);
});