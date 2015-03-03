function showDialog(){
    $.alertView.show();
};

function closeDialog(){
	$.alertView.visible = false;
}

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};














// function getLoc(e){
    // var place;
//     
    // if(e.success){
        // Ti.API.info("Hittade dig!");
//         
        // latitude = e.coords.latitude;
    	// longitude = e.coords.longitude;
//     
    	// // place = [lat, lon];
//     
    	// Ti.API.info(latitude, longitude);
    // } else {
    	// alert("Tusan");
    // }  
//     
    // // return place;
// };

//var loc = Ti.Geolocation.getCurrentPosition(getLoc);

function showLoc(){	
	
	// var lat = Alloy.Globals.latitude;
	// var lon = Alloy.Globals.longitude;
// 	
	// Ti.API.info(Alloy.Globals.getLoc());
}

