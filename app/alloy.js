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


var latitude = " ";
var longitude = " ";

function getLoc(e){    
    // try{
    	if(e.success){
        Ti.API.info("Hittade dig!");
       }
        latitude = e.coords.latitude;
    	longitude = e.coords.longitude;
    
    	Ti.API.info(latitude, longitude);
    // }catch{
    	alert("Tusan");
    // }
};


