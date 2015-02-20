var args = arguments[0] || {};

$.lblTrailName.text = args.name || 'Default Title';
$.lblTrailLength.text = args.length || 'Default Author';
$.lblTrailInfo.text = args.infoTxt || 'Default Author';
$.lblTrailColor.text = args.color || 'Default Title';

$.trailDetail.open();
//$.index.close();
