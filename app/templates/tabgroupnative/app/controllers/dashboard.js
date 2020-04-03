// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentController = null;
var objTab = {
	tab1: $.tab1,
	tab2: $.tab2,
};

(function constructor(args) {
	if (OS_ANDROID) {
		$.tabGroup.addEventListener("androidback", function() {});
	} else {
		$.tabGroup.hideNavBar();
	}
	Alloy.Globals.events.off("popToRootWindow");
	Alloy.Globals.events.off("openWindowInTab");
})(args);

function closeToRoot() {
	$.tabGroup.activeTab.popToRootWindow();
}

Alloy.Globals.events.on("popToRootWindow", closeToRoot);

function openWindow(o) {
	var tab = $.tabGroup.activeTab;

	_.defaults(o, {
		data: {},
		controller: null,
		dispatcher: null,
		openOutSideTab: false,
		modalOpts: {},
	});

	var win = Alloy.createController(o.controller, o.data);
	var currentWin = win.getView();

	function close() {
		if (currentWin) {
			if (o.openOutSideTab) {
				currentWin.close();
			} else {
				if (OS_IOS) {
					tab.close(currentWin);
				} else {
					currentWin.close();
				}
			}

			currentWin = null;
		}
		if (win) {
			win.off("close");
		}
		win = null;
	}
	win.on("close", close);
	win.on("select", function(e) {
		if (o.dispatcher) {
			Alloy.Globals.events.trigger(o.dispatcher, e);
		}

		close();
	});

	if (currentController !== o.controller) {
		if (o.openOutSideTab) {
			currentWin.open(o.modalOpts);
		} else {
			tab.open(currentWin);
		}
	}
	if (o.controller === "win") {
		currentController = o.data.controller;
	} else {
		currentController = o.controller;
	}
}

Alloy.Globals.events.on("openWindowInTab", openWindow);

function changeTab(e) {
	if (e.idMenu === "logout") {
		logout();
	} else if (objTab[e.idMenu]) {
		$.tabGroup.activeTab = objTab[e.idMenu];
	}
}

function handleOpen(e) {}
