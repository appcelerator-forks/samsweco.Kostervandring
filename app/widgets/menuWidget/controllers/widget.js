//Funktionerna nedan skickar användaren till rätt sida utifrån navigeringsmeyn
function toHome(e) {
  var index = Alloy.createController('index').getView();
  index.open();
}

function toList(e) {
  var index = Alloy.createController('index').getView();
  index.open();
}

function toDetail(e) {
  var trailDetail = Alloy.createController('trailDetail').getView();
  trailDetail.open();
}

//Lägger även in kartan på map-sidan när funktionen att gå till kartan anropas. 
function toMap(e) {
  	var mapWin = Alloy.createController('map').getView();

var MapModule = require('ti.map');

var hamn = MapModule.createAnnotation({
	latitude : 58.893550,
	longitude : 11.048776,
	title : 'Hamn',
	subtitle : 'Hamnen, här kan du åka båt'
});

var toalett = MapModule.createAnnotation({
	latitude : 58.891300,
	longitude : 11.040732,
	title : 'Toalett',
	subtitle : 'Toalett, här kan du...'
});

var lekpark = MapModule.createAnnotation({
	//58.894115, 11.040388
	latitude : 58.894115,
	longitude : 11.040388,
	title : 'Lekpark',
	subtitle : 'Lekpark, här kan du leka!'
});

var map3 = MapModule.createView({
    userLocation: true,
    mapType: MapModule.SATELLITE_TYPE,
    animate: true,
    //58.893539, 11.012579
    region: {latitude: 58.893539, 
    		longitude: 11.012579, 
    		latitudeDelta: 0.1, 
    		longitudeDelta: 0.1 },
    annotations : [hamn, toalett, lekpark],		
    height: '85%',
    width: Ti.UI.FILL
});

var redroute = MapModule.createRoute({
	width : 4,
	color : 'red',
	points : [
	{latitude : hamn.latitude, longitude : hamn.longitude},
	{latitude : toalett.latitude, longitude : toalett.longitude},
	{latitude : lekpark.latitude, longitude : lekpark.longitude}]
});

var blueroute = MapModule.createRoute({
	width : 4,
	color : 'blue',
	points : [
	{latitude : 58.885401, longitude : 11.011292},
	{latitude : 58.874577, longitude : 11.032063},
	{latitude : 58.883538, longitude : 11.042706}]
});

map3.addRoute(blueroute);
map3.addRoute(redroute);
mapWin.add(map3);
mapWin.open();
}

function toQuiz(e) {
  var trails = Alloy.createController('trails').getView();
  trails.open();
}


//
//Olika ikoner för olika skärmar
//

if(Titanium.Platform.displayCaps.platformsWidth <= 320){
	alert('rätt');
	$.btnHome.backgroundImage = '/icon/logga.png';
}










