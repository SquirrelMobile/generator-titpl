// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var currentController = null;
var objTab = {};

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
    dispatcher: null
  });

  var win = Alloy.createController(o.controller, o.data);
  var currentWin = win.getView();

  function close() {
    if (currentWin) {
      tab.close(currentWin);
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
    tab.open(currentWin);
  }
  if (o.controller === "win") {
    currentController = o.data.controller;
  } else {
    currentController = o.controller;
  }
}

Alloy.Globals.events.on("openWindowInTab", openWindow);

function changeTab(e) {
  if (e.source.idMenu === "logout") {
    logout();
  } else {
    $.tabGroup.activeTab = objTab[e.source.idMenu].getView();
  }
}

var oldTab = "home";
function focus(e) {
  if (e.tab && ["home", "account"].indexOf(e.tab.id) > -1) {
    $[oldTab + "Content"].opacity = 0;
    oldTab = e.tab.id;
    $[e.tab.id + "Content"].animate({
      opacity: 1,
      duration: 300
    });
  }
}

function handleOpen(e) {}
