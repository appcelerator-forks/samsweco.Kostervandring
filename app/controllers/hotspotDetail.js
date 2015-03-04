var args = arguments[0] || {};

$.lblHotspotName.text = args.title || "";
$.lblHotspotInfoTxt.text = args.infoTxt || "";
$.lblHotspotX.text = args.xkoord || "";
$.lblHotspotY.text = args.ykoord || "";

$.lblHotspotInfoTxt.text = args.information;

$.hotspotDetail.open();