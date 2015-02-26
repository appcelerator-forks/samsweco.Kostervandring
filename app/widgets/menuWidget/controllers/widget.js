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
  	// var Map = require('ti.map');
	// var mapview = Map.createView({mapType:Map.NORMAL_TYPE, region: {latitude:58.893333, longitude:11.014444, 
		// latitudeDelta:0.05, longitudeDelta:0.05}});

var MapModule = require('ti.map');
// var win = Ti.UI.createWindow({backgroundColor: 'white'});
// var third = Titanium.Platform.displayCaps.platformHeight / 3;
// var map1 = MapModule.createView({
    // userLocation: true,
    // mapType: MapModule.NORMAL_TYPE,
    // animate: true,
    // region: {latitude: 58.893550, longitude: 11.048776, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    // height: '33%',
    // top: 0,
    // width: Ti.UI.FILL
// });
// var map2 = MapModule.createView({
    // userLocation: true,
    // mapType: MapModule.HYBRID_TYPE,
    // animate: true,
    // region: {latitude: 58.893550, longitude: 11.048776, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    // height: '33%',
    // top: third,
    // width: Ti.UI.FILL
// });
var map3 = MapModule.createView({
    userLocation: true,
    mapType: MapModule.SATELLITE_TYPE,
    animate: true,
    region: {latitude: 58.893550, longitude: 11.048776, latitudeDelta: 0.1, longitudeDelta: 0.1 },
    height: '85%',
    width: Ti.UI.FILL
});
//win.add(map1);
//win.add(map2);
mapWin.add(map3);
//win.open();
 	mapWin.open();
}

function toQuiz(e) {
  var trails = Alloy.createController('trails').getView();
  trails.open();
}
