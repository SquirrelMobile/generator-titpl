import { AlertDialog } from "classes/ui/dialog";

/**
 * @class Lib.core
 * core lib
 */
(function() {
	var _exports = {
		/**
		 * call - description
		 *
		 * @param  {type} numero description
		 * @return {type}        description
		 */
		call: function(numero) {
			var dialog = Ti.UI.createAlertDialog({
				cancel: 1,
				buttonNames: [L("yes"), L("no")],
				message: numero,
				title: L("dial"),
			});
			dialog.addEventListener("click", function(e) {
				if (e.index === 0) {
					Ti.Platform.openURL("tel:" + numero);
				}
			});
			dialog.show();
		},
		alertSimple: function(title, message) {
			var d = new AlertDialog({
				title: title, //"Attention",
				message: {
					top: 10,
					text: message,
				},
				confirm: {
					text: L("OK"),
					top: 30,
					backgroundColor: Alloy.CFG.COLORS.main2,
					touchFeedback: true,
					color: "white",
					width: "99%",
					click: function() {
						d.hide();
					},
				},
			});
			d.show();
		},
		/**
		 * valideEmail - description
		 *
		 * @param  {type} valeur description
		 * @return {type}        description
		 */
		valideEmail: function(valeur) {
			return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
		},

		/**
		 * valideTelephone - description
		 *
		 * @param  {type} valeur description
		 * @return {type}        description
		 */
		valideTelephone: function(valeur) {
			return /^(((\+|00)\d{2,3})|0)[1-9]\d{8}$/.test(valeur);
		},

		/**
		 * removeItemFromArray - description
		 *
		 * @param  {type} array description
		 * @param  {type} from  description
		 * @param  {type} to    description
		 * @return {type}       description
		 */
		removeItemFromArray: function(array, from, to) {
			var rest = array.slice((to || from) + 1 || array.length);

			array.length = from < 0 ? array.length + from : from;

			return array.push.apply(array, rest);
		},

		/**
		 * removeAccents - description
		 *
		 * @param  {type} s description
		 * @return {type}   description
		 */
		removeAccents: function(s) {
			var r = s.toLowerCase();
			r = r.replace(new RegExp(/\s/g), "");
			r = r.replace(new RegExp(/[àáâãäå]/g), "a");
			r = r.replace(new RegExp(/æ/g), "ae");
			r = r.replace(new RegExp(/ç/g), "c");
			r = r.replace(new RegExp(/[èéêë]/g), "e");
			r = r.replace(new RegExp(/[ìíîï]/g), "i");
			r = r.replace(new RegExp(/ñ/g), "n");
			r = r.replace(new RegExp(/[òóôõö]/g), "o");
			r = r.replace(new RegExp(/œ/g), "oe");
			r = r.replace(new RegExp(/[ùúûü]/g), "u");
			r = r.replace(new RegExp(/[ýÿ]/g), "y");
			r = r.replace(new RegExp(/\W/g), "");

			return r;
		},

		/**
		 * listenNetwork - description
		 *
		 * @return {type}  description
		 */
		listenNetwork: function() {
			Alloy.Globals.online = Ti.Network.online;

			var handleNetwork = function(e) {
				Ti.API.log("handleNetwork" + e.online);
				Alloy.Globals.online = e.online;
			};

			Ti.Network.addEventListener("change", handleNetwork);
		},

		/**
		 * detectCrash - description
		 *
		 * @return {type}  description
		 */
		detectCrash: function() {
			Ti.App.addEventListener("uncaughtException", function(e) {
				Ti.API.log("--- uncaughtException " + JSON.stringify(e));
				if (_.isObject(e)) {
					Ti.App.Properties.setObject("crash", e);
					Ti.App.Properties.setBool("asCrash", true);
				}
			});

			if (Ti.App.Properties.getBool("asCrash")) {
				var d = Ti.UI.createAlertDialog({
					title: L("warning"),
					message: L("crashMsg"),
					buttonNames: [L("yes"), L("no")],
					cancel: 1,
					destructive: 0,
				});

				d.addEventListener("click", function(e) {
					if (e.index != e.cancel) {
						Ti.App.Properties.setBool("asCrash", false);
						var emailDialog = Ti.UI.createEmailDialog({});
						emailDialog.subject = L("crashTitle") + " " + Ti.App.name;
						emailDialog.toRecipients = [Alloy.CFG.crash.email];
						emailDialog.messageBody =
							L("error") + " : " + JSON.stringify(Ti.App.Properties.getObject("crash"));
						emailDialog.open();
					}
				});
				d.show();
			}
		},
		requestLocationPermissions: function(cb) {
			if (
				Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS) ||
				Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)
			) {
				Ti.Geolocation.getCurrentPosition(function(e) {
					if (e.success) {
						require("dao/variable").set("latitude", e.coords.latitude);
						require("dao/variable").set("longitude", e.coords.longitude);
						console.log("onLocation lat ", e.coords.longitude);
						console.log("onLocation long", e.coords.latitude);
						cb();
					} else {
						cb();
					}
				});
			} else {
				Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(e) {
					if (e.success) {
						Ti.Geolocation.getCurrentPosition(function(e) {
							if (e.success) {
								require("dao/variable").set("latitude", e.coords.latitude);
								require("dao/variable").set("longitude", e.coords.longitude);
								console.log("onLocation lat ", e.coords.longitude);
								console.log("onLocation long", e.coords.latitude);
								cb();
							} else {
								cb();
							}
						});
					}
				});
			}
		},
		getAttributed: function(o) {
			/*var conf = {
          newText : 'text to edit',
          attrs : [
            {
              words : ['word'],
              type : Titanium.UI.ATTRIBUTE_FONT,
              value : {fontFamily: Alloy.CFG.FONTS.bold, fontStyle: 'bold', fontSize : 18 }
            },
            {
              words : ['word'],
              type : Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
              value : Titanium.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE
            }
          ]
        }

        use :
        var attrContent = require('core').getAttributed(conf);
        if(attrContent){
          $.label.setAttributedString(attrContent);
        }
        */
			var tab = [];

			var newText = o.newText || "";
			var attrs = o.attrs;

			function searchText(word, i, attr) {
				var pos = newText.indexOf(word, i);

				if (pos > -1) {
					var obj = {
						type: attr.type,
						value: attr.value,
						range: [pos, word.length],
					};

					tab.push(obj);
					searchText(word, ++pos, attr);
				}
			}

			_.each(attrs, function(attr) {
				_.each(attr.words, function(word) {
					searchText(word, 0, attr);
				});
			});

			var attr = Titanium.UI.createAttributedString({
				text: newText,
				attributes: tab,
			});

			return attr;
		},
	};

	module.exports = _exports;
})();
