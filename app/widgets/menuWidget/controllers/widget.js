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
  	var Map = require('ti.map');
	var mapview = Map.createView({mapType:Map.NORMAL_TYPE, region: {latitude:58.893333, longitude:11.014444, 
		latitudeDelta:0.05, longitudeDelta:0.05}});
	
	mapWin.add(mapview);
  	mapWin.open();
}

function toQuiz(e) {
  var trails = Alloy.createController('trails').getView();
  trails.open();
}
