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
mapWin.open();
}

function toQuiz(e) {
  var trails = Alloy.createController('trails').getView();
  trails.open();
}

//Olika ikoner för olika skärmar
//--------------------------------------------------------

if(Titanium.Platform.displayCaps.platformsWidth <= 320){
	alert('rätt');
	$.btnHome.backgroundImage = '/icon/logga.png';
}
