console.log("DIRECTORY IS => " + Ti.Filesystem.applicationDataDirectory);
import { hasNotch } from "ti.detect";
require("/dao/cache");
const AvImageview = require("av.imageview");

if (Ti.version.replace(/[.]/gi, "").replace("GA", "") >= 900) {
	global.AvImageview = AvImageview;
}
Alloy.Globals.CONTENT_MODE_FIT = AvImageview.CONTENT_MODE_ASPECT_FIT;
Alloy.Globals.CONTENT_MODE_FILL = AvImageview.CONTENT_MODE_ASPECT_FILL;

Alloy.Globals.log = require("/log");

Alloy.Globals.events = _.clone(Backbone.Events);
Alloy.Globals.moment = require("moment");
Alloy.Globals.moment.locale(Ti.Locale.currentLanguage);
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.Device = {
	isiPhoneX: hasNotch,
	version: Ti.Platform.version,
	versionMajor: parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor: parseInt(Ti.Platform.version.split(".")[1], 10),
	width:
		Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
			? Ti.Platform.displayCaps.platformHeight
			: Ti.Platform.displayCaps.platformWidth,
	height:
		Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight
			? Ti.Platform.displayCaps.platformWidth
			: Ti.Platform.displayCaps.platformHeight,
	dpi: Ti.Platform.displayCaps.dpi,
	orientation:
		Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT ||
		Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT
			? "landscape"
			: "portrait",
};

if (OS_ANDROID) {
	Alloy.Globals.Device.width = Alloy.Globals.Device.width / (Alloy.Globals.Device.dpi / 160);
	Alloy.Globals.Device.height = Alloy.Globals.Device.height / (Alloy.Globals.Device.dpi / 160);
}

Alloy.Globals.drawerWidth = Math.round(Alloy.Globals.Device.width * 0.82);

require("install")();
require("core").listenNetwork();
if (!ENV_PROD) {
	require("core").detectCrash();
}

require("net/apiconfig").init();

Ti.App.addEventListener("resumed", function(e) {
	setTimeout(function() {
		if (OS_IOS) {
			Ti.UI.iOS.setAppBadge(0);
		} else {
			Ti.Android.NotificationManager.cancelAll();
		}
	}, 500);
});

if (OS_IOS) {
	Ti.UI.iOS.setAppBadge(0);
} else {
	Ti.Android.NotificationManager.cancelAll();
}

Alloy.Globals.top = OS_IOS ? (Alloy.Globals.Device.isiPhoneX ? 40 : 20) : 0;

// fieldView: {
// 	height: Ti.UI.SIZE,
// 	left: 0,
// 	right: 0,
// },
//enable push notification with OneSignal
//require("net/onesignalpns").init();

//appc new --import --no-services
// adb logcat | grep TiAPI
