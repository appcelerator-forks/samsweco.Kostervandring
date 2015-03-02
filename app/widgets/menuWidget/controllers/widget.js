//
// Funktion för att visa android eller ios-meny
//

if(OS_IOS){
	$.menuiOS.visible = true;
}

if(OS_ANDROID){
	$.menuAndroid.visible = true;
}

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
  var quizDetail = Alloy.createController('quizDetail').getView();
  quizDetail.open();
}
