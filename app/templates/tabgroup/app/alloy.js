console.log('DIRECTORY IS => '+Ti.Filesystem.applicationDataDirectory);

Alloy.Globals.moment = require('moment');
Alloy.Globals.moment.locale(Ti.Locale.currentLanguage);
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
Alloy.Globals.cache = {};
Alloy.Globals.drawerWidth  = Math.round(OS_IOS ? (Ti.Platform.displayCaps.platformWidth*0.828) : Ti.Platform.displayCaps.xdpi);
require('install')();
require("core").listenNetwork();
if(!ENV_PROD){
	//require("core").detectCrash();
}
//Activer les notification push avec Pushwoosh
//require('net/apiconfig').init();

if(OS_IOS){

	Ti.App.addEventListener('resumed', function(e){

		setTimeout(function(){

			Ti.UI.iOS.setAppBadge(0);

		},500);

	});

	Ti.UI.iOS.setAppBadge(0);
}

//appc new --import --no-services
// adb logcat | grep TiAPI
