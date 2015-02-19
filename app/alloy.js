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

var hotspot_trailsCollection = Alloy.Collections.hotspot_trailsModel;
var hotspotCollection = Alloy.Collections.hotspotModel;
var imageCollection = Alloy.Collections.imageModel;
var infospot_trailsCollection = Alloy.Collections.infospot_trailsModel;
var infospotCollection = Alloy.Collections.infospotModel;


//-------------------------------------------------------------------------
//Adding some data into the models.

var hotspot = Alloy.createModel('hotspotModel', {
	id : 1,
	name : 'Kyrka',
	infoTxt : 'Kyrkan ligger på södra Koster',
	xkoord : 0,
	ykoord : 0
});

// 
// personsCollection.add(Madde);
// Madde.save();
