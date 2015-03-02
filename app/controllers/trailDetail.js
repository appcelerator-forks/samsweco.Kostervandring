var args = arguments[0] || {};

$.lblTrailName.text = args.title || 'Default Name';
$.lblTrailLength.text = args.length || 'Default Length';
$.lblTrailInfo.text = args.infoTxt || 'Default infoText';
$.lblTrailColor.text = args.color || 'Default Color';

var trailId = args.id;

//Tanken är att hämta de bilder som hör till en vandringsled med ett visst id och sätta dem i en lista...
function loadSlideShow(){
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch();
	
	//Behöver metod för att hämta namnet på den bildfil som är för en vandringsled med trailId...
	var trailPics = mediaCollection.where({trail_id:trailId});
	
	//Loopa den ovan och sätt ut i bilspelet...
}

$.trailDetail.open();
//$.index.close();
