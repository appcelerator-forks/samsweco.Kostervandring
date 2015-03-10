var args = arguments[0] || {};


$.lblInfoTitle.text = args.name || "Title";
$.lblInfoText.text = args.infoTxt || "Info";
$.lblInfoLink.text = args.link || "url";

$.infoImg.image = args.img;
