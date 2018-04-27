console.log('DIRECTORY IS => '+Ti.Filesystem.applicationDataDirectory);

Alloy.Globals.events = _.clone(Backbone.Events);
Alloy.Globals.moment = require('moment');
Alloy.Globals.moment.locale(Ti.Locale.currentLanguage);
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");

Alloy.Globals.Device = {
	isiPhoneX 	 : (Ti.Platform.displayCaps.platformWidth === 375 && Ti.Platform.displayCaps.platformHeight === 812 && Ti.Platform.displayCaps.logicalDensityFactor === 3),
	version			 : Ti.Platform.version,
	versionMajor : parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor : parseInt(Ti.Platform.version.split(".")[1], 10),
	width				 : (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
	height			 : (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
	dpi					 : Ti.Platform.displayCaps.dpi,
	orientation	 : Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "landscape" : "portrait"
};

if (OS_ANDROID) {
	Alloy.Globals.Device.width = (Alloy.Globals.Device.width / (Alloy.Globals.Device.dpi / 160));
	Alloy.Globals.Device.height = (Alloy.Globals.Device.height / (Alloy.Globals.Device.dpi / 160));
}

require('install')();
require("core").listenNetwork();
if(!ENV_PROD){
	require("core").detectCrash();
}

require('net/apiconfig').init();

if(OS_IOS){

	Ti.App.addEventListener('resumed', function(e){

		setTimeout(function(){

			Ti.UI.iOS.setAppBadge(0);

		},500);

	});

	Ti.UI.iOS.setAppBadge(0);
}

//enable push notification with OneSignal
//require("net/onesignalpns")();

//appc new --import --no-services
// adb logcat | grep TiAPI
