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

//-----------------------------------------------------------
// Metoder för alla collections
//-----------------------------------------------------------

function getHotspotCollection() {
	var hotspotCollection = Alloy.Collections.hotspotModel;
	hotspotCollection.fetch();

	return hotspotCollection;
}

function getMediaCollection(){
	var mediaCollection = Alloy.Collections.mediaModel;
	mediaCollection.fetch();
	
	return mediaCollection;
}

//-----------------------------------------------------------
// Felhantering
//-----------------------------------------------------------
function newError(errorMsg, pageName) {
	try {
		var er = new Error(errorMsg);
		er.myObject = pageName;
		throw er;
	} catch (e) {

		alert("Error:[" + e.message + "] has occured on " + e.myObject + " page.");
	}
}

//-----------------------------------------------------------
// Globala variabler för geofencing.
//-----------------------------------------------------------
var gLat = 0;
var gLon = 0;

//-----------------------------------------------------------
// Alertbox som visas när man börjar närma sig en punkt.
//-----------------------------------------------------------
function showDialog() {

	var dialog = Ti.UI.createAlertDialog({
		cancel : 1,
		buttonNames : ['OK', 'Cancel'],
		message : 'Gå till nästa fråga?',
		title : 'Bokstav i närheten!'
	});

	dialog.addEventListener('click', function(e) {

		if (e.index === e.source.cancel) {
			// closeDialog();
		} else {
			var interactiveWin = Alloy.createController("interactive").getView();
			Alloy.CFG.tabs.activeTab.open(interactiveWin);
			//$.infoDetail.openInteractive();
		}
	});
	dialog.show();
};

//-----------------------------------------------------------
// Array som håller bokstäverna från bokstavsjakten.
//-----------------------------------------------------------
var lettersArray = [];
var globalTrailID = 0;

