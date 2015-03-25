var args = arguments[0] || {};


function openInteractive() {
			var interactiveWin = Alloy.createController("interactive").getView();
			Alloy.CFG.tabs.activeTab.open(interactiveWin);
}

exports.openInteractive = openInteractive;

