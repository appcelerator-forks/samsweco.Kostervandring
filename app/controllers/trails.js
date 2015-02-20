var args = arguments[0] || {};

var trailsCollection = Alloy.Collections.trailsModel;
trailsCollection.fetch();

function showTrailDetails(trail)
{
	var selectedTrail = trail.source;
	var args = {
		name: selectedTrail.name,
		length: selectedTrail.length,
		infoTxt : selectedTrail.infoTxt,
		color: selectedTrail.color
	};
	
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