var args = arguments[0] || {};

$.lblTrailName.text = "Vandringsled : " + args.title || 'Default Name';
$.lblTrailLength.text = "Distans: " + args.length  + " kilometer"|| 'Default Length';
$.lblTrailColor.text = "Färgmarkering: " + args.color || 'Default Color';
$.lblTrailInfo.text = "Beskrivning : " + args.infoTxt || 'Default infoText';

var trailId = args.id;
Titanium.API.info(JSON.stringify(trailId) + " är ID");

selectTrailPics();
//testArray();

// function testArray(){
	// var people = [
	// {
		// name : 'Anna',
		// town : 'Nora'
	// },
// 	
	// {
		// name : 'Madde',
		// town : 'Örebro'
	// },
// 	
	// {
		// name : 'Sandra',
		// town : 'Örebro'
	// }];
// 	
	// var results = [];
	// people.forEach(function(person){
		// results.push(person.name);
	// });
// 	
	// Titanium.API.info(JSON.stringify(results));
// }

function selectTrailPics(){
	
	
	//DETTA EXEMPEL FUNKAR! GRRRRRRRRRRRRRRRRRRRRRRR!!!!!!!
		// var people = [
	// {
		// name : 'Anna',
		// town : 'Nora'
	// },
// 	
	// {
		// name : 'Madde',
		// town : 'Örebro'
	// },
// 	
	// {
		// name : 'Sandra',
		// town : 'Örebro'
	// }];
// 	
	// var results = [];
	// people.forEach(function(person){
		// results.push(person.name);
	// });
// 	
	// Titanium.API.info(JSON.stringify(results));

	// for(var i = 0; i < results.length; i++){
		// var view_args = {
		 // backgroundImage : results[i]
	// };
	// Titanium.API.info(JSON.stringify(results[i]));

	var id = trailId;
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch({query: 'SELECT filename from mediaModel where trail_id="'+trailId+'"'});

	// var filename = mediaCollection.fetch('filename');
	 Titanium.API.info(JSON.stringify(mediaCollection));
	
	for(var i = 0; i < mediaCollection.length; i++){	
		var view_args = {
		 backgroundImage : mediaCollection[0]
	};
	Titanium.API.info(JSON.stringify(mediaCollection[i]));
	
	var img_view = Ti.UI.createView(view_args);
	
	$.slideShowTrails.addView(img_view);
}
}

$.trailDetail.open();
//$.index.close();
