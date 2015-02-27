var args = arguments[0] || {};

$.lblHotspotName.text = args.title || 'Default Name';
$.lblHotspotInfoTxt.text = args.infoTxt || 'Default infoTxt';
$.lblHotspotX.text = args.xkoord || 'Default X';
$.lblHotspotY.text = args.ykoord || 'Default Y';



$.hotspotDetail.open();