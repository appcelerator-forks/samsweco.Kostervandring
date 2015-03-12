// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

function newError(errorMsg, pageName) {
	try {
		var er = new Error(errorMsg);
		er.myObject = pageName;
		throw er;
	} catch (e) {

		alert("Error:[" + e.message + "] has occured on " + e.myObject+ " page." 
		//On line " + e.line + " SourceID : " + " \nsourceID:" + e.sourceId + "\nsourceURL:" + e.sourceURL
		);
	}
}

var lat = "";
var lon = "";