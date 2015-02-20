var args = arguments[0] || {};

var trailsCollection = Alloy.Collections.trailsModel;
trailsCollection.fetch();

function showTrailDetails(event){
	var selectedTrail = event.row;
	var args = {
		title: selectedTrail.title,
		length: selectedTrail.length,
		infoTxt : selectedTrail.infoTxt,
		color: selectedTrail.color
	};
	
	alert(JSON.stringify(args));

	var trailDetail = Alloy.createController("trailDetail", args).getView();
	trailDetail.open();
	$.trails.close();
}

// function showBook(event)
// {
	// var selectedBook = event.source;
	// var args = {
		// title: selectedBook.title,
		// author: selectedBook.author
	// };
// 	
	// var bookView = Alloy.createController("bookDetails", args). getView();
	// bookView.open();
// }