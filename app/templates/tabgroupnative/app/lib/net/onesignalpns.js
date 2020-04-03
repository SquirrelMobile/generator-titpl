/*********************************************************
 *
 *  OneSignal Push Notifications Services communication
 *  https://github.com/williamrijksen/com.williamrijksen.onesignal
 *********************************************************/
(function() {
	//TODO:
	/*
  In tiapp.xml, configure these variable for Android :
  <!-- PUT YOUR ONE SIGNAL APP ID HERE -->
  <!-- <meta-data android:name="onesignal_app_id" android:value="11111111-1111-1111-1111-111111111111" /> -->
  <!-- PUT YOUR GOOGLE PROJECT NUMBER HERE -->
  <!-- <meta-data android:name="onesignal_google_project_number" android:value="str:XXXXXXXXX" /> -->

  For iOS :
  <!-- <property name="OneSignal_AppID" type="string">11111111-1111-1111-1111-111111111111</property> -->
  */

	// This registers your device automatically into OneSignal
	var onesignal = require("com.williamrijksen.onesignal");

	var _exports = {
		/**
		 * init - description
		 *
		 * @return {type}  description
		 */
		init: function() {
			//initialize
			onesignal.idsAvailable(function(e) {
				Ti.API.log("--- idsAvailable " + JSON.stringify(e));
				//pushToken will be nil if the user did not accept push notifications
				if (e.pushToken) {
					Ti.App.Properties.setString("notificationToken", e.pushToken);
				}
				if (e.userId) {
					Ti.App.Properties.setString("userIdOneSignal", e.userId);
				}
				if (e.pushToken && e.userId && Ti.App.Properties.getBool("isConnected")) {
					// var obj = {
					//   type_os: OS_IOS ? "ios" : "android",
					//   token_push: Ti.App.Properties.setString("notificationToken"),
					//   player_id: Ti.App.Properties.getString("userIdOneSignal")
					// };
					// setTimeout(function() {
					//     Alloy.Globals.Api.updateUser({ body: obj }, function(e) {
					//       console.log("UpdateOnesignal", JSON.stringify(e));
					//     });
					// }, 1000);
				}
			});

			//start event
			onesignal.removeEventListener("notificationReceived", function() {});

			/*
  		Received listener: The returned content is matching the available payload on OneSignal:

  		iOS https://documentation.onesignal.com/docs/ios-native-sdk#section--osnotificationpayload-
  		Android https://documentation.onesignal.com/docs/android-native-sdk#section--osnotificationpayload-
  		*/
			onesignal.addEventListener("notificationReceived", function(evt) {
				console.log(" ***** Received! " + JSON.stringify(evt));
				if (Ti.App.Properties.getBool("isConnected")) {
					///DO SOMETHING
				}
			});

			onesignal.removeEventListener("notificationOpened", function() {});

			/*
  		Opened listener: The returned content is matching the available payload on OneSignal:

  		iOS https://documentation.onesignal.com/docs/ios-native-sdk#section--osnotificationpayload-
  		Android https://documentation.onesignal.com/docs/android-native-sdk#section--osnotificationpayload-
  		onesignal.addEventListener('notificationOpened', function (evt) {
  		    alert(evt);
  		    if (evt) {
  		        var title = '';
  		        var content = '';
  		        var data = {};

  		        if (evt.title) {
  		            title = evt.title;
  		        }

  		        if (evt.body) {
  		            content = evt.body;
  		        }

  		        if (evt.additionalData) {
  		            if (OS_ANDROID) {
  		                // Android receives it as a JSON string
  		                data = JSON.parse(evt.additionalData);
  		            } else {
  		                data = evt.additionalData;
  		            }
  		        }
  		    }
  		    alert("Notification opened! title: " + title + ', content: ' + content + ', data: ' + evt.additionalData);
  		});
  		*/
			onesignal.addEventListener("notificationOpened", function(evt) {
				console.log(" ***** notificationOpened! " + JSON.stringify(evt));
				if (Ti.App.Properties.getBool("isConnected")) {
					///DO SOMETHING
				}
			});
		},
		subscribe: function() {
			onesignal.setSubscription(true);
			if (OS_IOS) {
				onesignal.promptForPushNotificationsWithUserResponse(function(obj) {
					Ti.API.log("ONE signal " + JSON.stringify(obj));
					Ti.App.Properties.setBool("allowNotification", true);
					// Ti.App.Properties.setString("notificationToken", e.registrationId);
				});
			}
		},

		//onesignal.sendTag({ key: 'foo', value: 'bar' });

		//onesignal.deleteTag({ key: 'foo' });

		/*onesignal.getTags(function(e) {
        if (!e.success) {
            Ti.API.error("Error: " + e.error);
            return
        }

        Ti.API.info(OS_IOS ? e.results : JSON.parse(e.results));
    });*/

		//postNotification (iOS-only for now):
		//You can use idsAvailable for retrieving a playerId
		/*onesignal.postNotification({
        message:'Titanium test message',
        playerIds:["00000000-0000-0000-0000-000000000000"]
    });*/

		/*Set log level (iOS-only for now):

    onesignal.setLogLevel({
        logLevel: onesignal.LOG_LEVEL_DEBUG,
        visualLevel: onesignal.LOG_LEVEL_NONE
    });*/
	};

	module.exports = _exports;
})();
