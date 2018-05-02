/**
 * @class Lib.core
 * core lib
 */
(function(){

  var _exports = {
      /**
       * call - description
       *
       * @param  {type} numero description
       * @return {type}        description
       */
      call : function(numero){
        var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: [L('yes'),L('no')],
          message: numero,
          title: L('dial')
        });
        dialog.addEventListener('click', function(e){
          if(e.index === 0){
            Ti.Platform.openURL('tel:'+numero);
          }
        });
        dialog.show();
      },

      /**
       * valideEmail - description
       *
       * @param  {type} valeur description
       * @return {type}        description
       */
      valideEmail: function(valeur){

          return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
      },

      /**
       * valideTelephone - description
       *
       * @param  {type} valeur description
       * @return {type}        description
       */
      valideTelephone: function(valeur){

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
      removeAccents: function(s){

          var r=s.toLowerCase();
          r = r.replace(new RegExp(/\s/g),"");
          r = r.replace(new RegExp(/[àáâãäå]/g),"a");
          r = r.replace(new RegExp(/æ/g),"ae");
          r = r.replace(new RegExp(/ç/g),"c");
          r = r.replace(new RegExp(/[èéêë]/g),"e");
          r = r.replace(new RegExp(/[ìíîï]/g),"i");
          r = r.replace(new RegExp(/ñ/g),"n");
          r = r.replace(new RegExp(/[òóôõö]/g),"o");
          r = r.replace(new RegExp(/œ/g),"oe");
          r = r.replace(new RegExp(/[ùúûü]/g),"u");
          r = r.replace(new RegExp(/[ýÿ]/g),"y");
          r = r.replace(new RegExp(/\W/g),"");

          return r;
      },

      /**
       * listenNetwork - description
       *
       * @return {type}  description
       */
      listenNetwork : function(){

		    Alloy.Globals.online = Ti.Network.online;

		    var handleNetwork = function(e){
            Ti.API.log("handleNetwork" + e.online);
            Alloy.Globals.online = e.online;

        };

        Ti.Network.addEventListener('change', handleNetwork);

  		},

      /**
       * detectCrash - description
       *
       * @return {type}  description
       */
      detectCrash : function(){

        Ti.App.addEventListener('uncaughtException', function (e) {
        	Ti.API.log('--- uncaughtException ' + JSON.stringify(e));
        	if(_.isObject(e)){
        		Ti.App.Properties.setObject('crash', e);
        		Ti.App.Properties.setBool('asCrash', true);
        	}
        });

        if(Ti.App.Properties.getBool('asCrash')){

        	var d = Ti.UI.createAlertDialog({
        		title : L('warning'),
        		message : L('crashMsg'),
        		buttonNames : [L('yes'), L('no')],
        		cancel : 1,
        		destructive : 0
        	});

        	d.addEventListener('click', function(e){
        		if(e.index != e.cancel){
        			Ti.App.Properties.setBool('asCrash', false);
        			var emailDialog = Ti.UI.createEmailDialog({});
        			emailDialog.subject = L('crashTitle')+" "+Ti.App.name;
        			emailDialog.toRecipients = [Alloy.CFG.crash.email];
        			emailDialog.messageBody = L('error')+' : '+JSON.stringify(Ti.App.Properties.getObject('crash'));
        			emailDialog.open();
        		}
        	});
        	d.show();

        }
      },
      requestLocationPermissions : function(cb) {

        var location = function(e) {
            Ti.API.log('--- location ' + JSON.stringify(e));
            if (e.success) {

                var coords = e.coords;
                if (coords) {
                    require('dao/variable').set('latitude', coords.latitude);
                    require('dao/variable').set('longitude', coords.longitude);
                }
                if(cb){
                  cb();
                }

            } else {
              if(cb){
                cb();
              }
            }
        };

        if (OS_ANDROID) {
            Ti.Geolocation.ACCURACY_BEST;

            if (!Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS)) {

                Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_ALWAYS, function(result) {
                    if (!result.success) {

                        Ti.UI.createAlertDialog({ title : L('warning'), message : L('locationActiveMsg')}).show();
                        
                    } else {

                        if (!Ti.Geolocation.locationServicesEnabled) {

                            var geoloc = Ti.Geolocation.lastGeolocation;
                            if (geoloc) {
                                require('dao/variable').set('latitude', geoloc.latitude);
                                require('dao/variable').set('longitude', geoloc.longitude);
                            }
                            if(cb){
                              cb();
                            }
                        } else {

                            Ti.Geolocation.getCurrentPosition(location);
                        }
                    }
                });

            } else {
                if (!Ti.Geolocation.locationServicesEnabled) {
                    var geoloc = Ti.Geolocation.lastGeolocation;
                    if (geoloc) {
                        require('dao/variable').set('latitude', geoloc.latitude);
                        require('dao/variable').set('longitude', geoloc.longitude);
                    }
                    if(cb){
                      cb();
                    }
                } else {
                    Ti.Geolocation.getCurrentPosition(location);
                }
            }

        } else {

            if (Ti.Geolocation.locationServicesAuthorization != Titanium.Geolocation.AUTHORIZATION_WHEN_IN_USE && Ti.Geolocation.locationServicesAuthorization != Titanium.Geolocation.AUTHORIZATION_UNKNOWN) {
                var geoloc = Ti.Geolocation.lastGeolocation;
                if (geoloc) {
                    require('dao/variable').set('latitude', geoloc.latitude);
                    require('dao/variable').set('longitude', geoloc.longitude);
                }
                if(cb){
                  cb();
                }
            } else {
                Ti.Geolocation.getCurrentPosition(location);
            }

        }

    }
  };

  module.exports = _exports;

})();
