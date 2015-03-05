function showDialog(){
    $.alertView.show();
};

function closeDialog(){
	$.alertView.visible = false;
};

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};






var latitude = " ";
var longitude = " ";

// function getLoc(e){    
// 
    	// if(e.success){
        // Ti.API.info("Hittade dig!");
        // Ti.API.info(e);        
       // }
        // latitude = e.coords.latitude;
    	// longitude = e.coords.longitude;
//     
    	// Ti.API.info(latitude, longitude);
// };

// Ti.Geolocation.getCurrentPosition(getLat);
// Ti.Geolocation.getCurrentPosition(getLon);
// 
// 
// function getLat(e){
	// if(e.success){
        // Ti.API.info("Hittade dig!");
        // Ti.API.info(e);        
      // }
//       
        // latitude = e.coords.latitude;
//     
    	// Ti.API.info(latitude);
    	// $.lblLat.text = latitude;
// };
// 
// function getLon(e){
	// if(e.success){
        // Ti.API.info("Hittade dig!");
        // Ti.API.info(e);        
      // }
//       
        // longitude = e.coords.longitude;
//     
    	// Ti.API.info(longitude);
    	// $.lblLon.text = longitude;
// };

// function writePlace(){
	// var lati = Ti.Geolocation.getCurrentPosition(getLat);
	// var longi = Ti.Geolocation.getCurrentPosition(getLon);
// 	
// 	
// 	
// }





