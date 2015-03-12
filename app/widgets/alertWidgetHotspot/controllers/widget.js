function showDialog(){
    $.dialog.show();
};

function closeDialog(){
	$.dialog.close();
};

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};


//Hämtar position och kallar uppdatering, kollar även om man närmar sig punkt
function startGeolocation() {
	Ti.Geolocation.getCurrentPosition(geoSuccess);
	setTimeout(startGeolocation, 3000);
	isNearPoint();
}

//Uppdaterar position
function geoSuccess(e) {
	var gpsPosition = e;
	var coordinates = gpsPosition.coords;
	lat = coordinates.latitude;
	lon = coordinates.longitude;

	Ti.API.info("Hejhej", lat, lon);
}

//Kollar hur långt kvar man har till koordinater
function distanceInM(lat1, lon1, lat2, lon2) {

	if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
		alert("Det finns inga koordinater att titta efter");
	}

	var R = 6371;

	var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;

	var distance = (R * 2 * Math.asin(Math.sqrt(a))) * 1000;

	return distance;

}

var radius = 10;

//Kollar om man är innanför en radius
function isInsideRadius(Lat2, Lon2, radius) {
	if (lat == null || lon == null) {
		return false;
	}
	var distance = distanceInM(Lat2, Lon2, lat, lon);

	if (distance <= radius) {
		return true;
	}

	return false;
}

//Alertar när man är innanför en radius
function isNearPoint() {
	var latitude = ["59.271600", "59.271525"];
	var longitude = ["15.213898", "15.214516"];

	for (var la in latitude) {
		for (lo in longitude) {
			if (isInsideRadius(latitude[la], longitude[lo], radius)) {
				alert("Nu är du framme!!!!");
			}
		}
	}
}