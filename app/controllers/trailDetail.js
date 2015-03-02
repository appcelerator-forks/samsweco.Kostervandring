var args = arguments[0] || {};

$.lblTrailName.text = args.title || 'Default Name';
$.lblTrailLength.text = args.length || 'Default Length';
$.lblTrailInfo.text = args.infoTxt || 'Default infoText';
$.lblTrailColor.text = args.color || 'Default Color';

var trailId = args.id;
Titanium.API.info(JSON.stringify(trailId) + " är ID");

//trailSlideShow(selectedTrailPics);
selectTrailPics();

//Tanken är att hämta de bilder som hör till en vandringsled med ett visst id och sätta dem i en lista...
function selectTrailPics(){

	var id = trailId;
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch();	
	var filteredCollection = mediaCollection.where({trail_id: id});
	
	Titanium.API.info(JSON.stringify(filteredCollection)+ " ska vara bilderna");
	return filteredCollection;
}

function trailSlideShow(collection){
	//Här kommer en collection med de utvalda bilderna...
	var selected = collection;
	
	
	//Här skriv hur bilderna ska visas i XML:en.........
}

$.trailDetail.open();
//$.index.close();
