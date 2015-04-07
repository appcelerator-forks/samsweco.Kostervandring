// var args = arguments[0] || {};
// 
// setRowData();
// 
// try {
	// var hotspotCollection = getHotspotCollection();
	// hotspotCollection.fetch();
// } catch(e) {
	// newError("Något gick fel när sidan skulle laddas, prova igen!", "Hotspots - create hotspotCollection");
// }
// 
// function back(){
	// $.navwin.close();
// }
// //-----------------------------------------------------------
// // Visar detaljVy för en vald hotspot
// //-----------------------------------------------------------
// function showHotspotDetails(hotspot) {
	// try {
		// var selectedHotspot = hotspot.row;
		// var args = {
			// id : selectedHotspot.number,
			// title : selectedHotspot.name,
			// infoTxt : selectedHotspot.infoTxt
		// };
// 
		// var hotspotDetail = Alloy.createController("hotspotDetail", args).getView();
		// hotspotDetail.open();
	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "HotspotDetail - showHotspotDetails");
	// }
// }
// 
// //-----------------------------------------------------------
// // Läser in alla items till en lista.
// //-----------------------------------------------------------
// function setRowData() {
	// var tableViewData = [];
	// var rows = hotspotCollection.toJSON();
// 
	// for (var i = 0; i < rows.length; i++) {
		// var row = Ti.UI.createTableViewRow({
			// id : i + 1,
			// height : '80dp',
			// top : '0dp',
			// hasChild : true
		// });
// 
		// var listItem = Ti.UI.createView({
			// height : '80dp',
			// layout : 'horizontal'
		// });
// 
		// var verticalView = Ti.UI.createView({
			// layout : 'vertical'
		// });
// 
		// var coverimg = Ti.UI.createImageView({
			// height : '80dp',
			// width : '100dp',
			// left : '10dp'
		// });
// 
		// var lblName = Ti.UI.createLabel({
			// left : '10dp',
			// font : {
				// fontSize : 13
			// }
		// });
// 
		// var lblPlace = Ti.UI.createLabel({
			// left : '10dp',
			// font : {
				// fontSize : 11
			// }
		// });
// 
		// var id = rows[i].id;
		// coverimg.image = rows[i].cover_pic;
		// lblName.text = rows[i].name;
		// lblPlace.text = "Nordkoster";
// 
		// verticalView.add(lblName);
		// verticalView.add(lblPlace);
		// listItem.add(coverimg);
		// listItem.add(verticalView);
// 
		// row.add(listItem);
		// tableViewData.push(row);
	// }
// 
	// $.table.data = tableViewData;
// }
// 
// //-----------------------------------------------------------
// // Hämtar info för en hotspot
// //-----------------------------------------------------------
// function getHotspotInfo(e) {
// 
	// try {
		// var id = e.rowData.id;
		// hotspotCollection.fetch({
			// query : 'SELECT name, infoTxt from hotspotModel where id = "' + id + '"'
		// });
// 
		// var jsonObj = hotspotCollection.toJSON();
// 		
		// var hotspotTxt = {
			// title : jsonObj[0].name,
			// infoTxt : jsonObj[0].infoTxt,
			// id : id
		// };
// 
		// var hotspotDetail = Alloy.createController("hotspotDetail", hotspotTxt).getView();
		// // hotspotDetail.open();
		// $.navwin.openWindow(hotspotDetail);
// 
	// } catch(e) {
		// newError("Något gick fel när sidan skulle laddas, prova igen!", "Index");
	// }
// 
// }
