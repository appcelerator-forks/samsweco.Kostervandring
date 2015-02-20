var args = arguments[0] || {};

$.lblTrailName.text = args.title || 'Default Name';
$.lblTrailLength.text = args.length || 'Default Length';
$.lblTrailInfo.text = args.infoTxt || 'Default infoText';
$.lblTrailColor.text = args.color || 'Default Color';

$.trailDetail.open();
//$.index.close();
