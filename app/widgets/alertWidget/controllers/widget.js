function showDialog(){
    $.alertView.show();
};

function closeDialog(){
	$.alertView.visible = false;
}

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};












function showLoc(myPos){	
	var loc = Ti.Geolocation.getCurrentPosition(getLoc);
	
	myPos[loc];
	
	var latitude = myPos[0];
	var longitude = myPos[1];
	
	Ti.API.info(latitude, longitude);
}

function getLoc(e){
    var place;
    
    if(e.success){
        Ti.API.info("Hittade dig!");
        
        var lat = e.coords.latitude;
    	var lon = e.coords.longitude;
    
    	place = [lat, lon];
    
    	Ti.API.info(place);
    } else {
    	alert("Tusan");
    }   
    
	return place;	
};



