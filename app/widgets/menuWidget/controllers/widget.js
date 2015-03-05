//Funktionerna nedan skickar användaren till rätt sida utifrån navigeringsmeyn
function toHome(e) {
  var index = Alloy.createController('index').getView();
  index.open();
}

function toDetail(e) {
  var hotspots = Alloy.createController('hotspots').getView();
  hotspots.open();
}

//Lägger även in kartan på map-sidan när funktionen att gå till kartan anropas. 
function toMap(e) {
var mapWin = Alloy.createController('map').getView();
mapWin.open();
}

function toQuiz(e) {
  var quizDetail = Alloy.createController('quizDetail').getView();
  quizDetail.open();
}

function toTrails(e) {
  var trails = Alloy.createController('trails').getView();
  trails.open();
}

