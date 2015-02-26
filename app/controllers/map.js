var args = arguments[0] || {};

//Funktionerna nedan skickar användaren till rätt sida utifrån navigeringsmeyn
function goHome(e){
	$.map.close();
}

// var bb1 = Titanium.UI.createButtonBar({
// labels:['One', 'Two', 'Three'],
// backgroundColor:'#336699',
// style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
// height:25,
// width:200
// });
// 
// $.map.add(bb1);
//--------------------------------------------------------

$.map.open();