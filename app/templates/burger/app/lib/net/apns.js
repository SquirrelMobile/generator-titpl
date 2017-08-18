/*********************************************************
 *
 *  Apple Push Notifications Services communication
 *
 *********************************************************/
(function(){

	var pushwoosh = require('com.pushwoosh.module');

	var _exports = function(){

		pushwoosh.onPushReceived(function(e) {
			Ti.API.info('Push notification received: ' + JSON.stringify(e));
		});

		pushwoosh.onPushOpened(function(e) {
			Ti.API.info('Push notification opened: ' + JSON.stringify(e));
		});

		pushwoosh.initialize({
				"application" : Alloy.CFG.pushwoosh.projectId,
				"gcm_project" : Alloy.CFG.pushwoosh.gcmID,
		});

		pushwoosh.registerForPushNotifications(
			function(e) {
						Ti.API.info('JS registration success event: ' + e.registrationId);
						Ti.API.info('Push token ' + pushwoosh.getPushToken());
						Ti.App.Properties.setString('notificationToken', e.registrationId);
				},
				function(e) {
						Ti.API.error("Error during registration: " + e.error);
				}
		);

		Ti.API.info('Pushwoosh hwid: ' + pushwoosh.getHwid());

		Ti.API.info("Notification settings: " + JSON.stringify(pushwoosh.getNotificationSettings()));

		if(Ti.App.Properties.getBool('isConnected')){
			var idUser = require('dao/variable').getInt("iduser");
			if(idUser){
				try{
					pushwoosh.setUserId(''+idUser);
				}catch(e){
					Ti.API.log('--- erreur set ID idUser ' + idUser);
				}

			}
		}
	};

	module.exports = _exports;

})();
