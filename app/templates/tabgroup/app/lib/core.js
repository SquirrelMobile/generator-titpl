/**
 * @class Lib.core
 * core lib
 */
(function(){

  var _exports = {

      /**
       * requiredField - description
       *
       * @param  {type} field         description
       * @param  {type} option        description
       * @param  {type} civilfieldLbl description
       * @return {type}               description
       */
      requiredField: function(field, option,civilfieldLbl){

        var verifOk = true;
        var option = option || {};
        _.defaults(option,{
          borderColor : "red",
          hintTextColor :"red",
          text : field.txtError || "Champ non valide",
          borderColorBefore : "transparent",
          hintTextColorBefore : "#717171"
        });

        if(field.value === ""){
          field.borderColor = option.borderColor;
          if (civilfieldLbl) {
            civilfieldLbl.color = option.hintTextColor;
          }
          else {
            field.hintTextColor = option.hintTextColor;
            field.hintText = option.text;
            field.zIndex = 1;
            verifOk = false;
          }

        }else{
          field.borderColor = option.borderColorBefore;
          if (civilfieldLbl) {
            civilfieldLbl.color = "black";
          }
          else {
            field.hintTextColor = option.hintTextColorBefore;
            field.zIndex = -1;
          }
        }

        if(field.type === "email"){
          if(!_exports.valideEmail(field.value)){
            field.borderColor = option.borderColor;
            field.hintTextColor = option.hintTextColor;
            field.zIndex = 1;
            field.hintText =  option.text;

            verifOk = false;
          }
        }

        return verifOk;

      },

      /**
       * civilite - description
       *
       * @param  {type} optTmp    description
       * @param  {type} lbl       description
       * @param  {type} groupView description
       * @return {type}           description
       */
      civilite : function(optTmp, lbl, groupView){
        var opt = null;
        opt = optTmp;
        if (_.indexOf(opt, "Annuler") === -1) {
          opt.push("Annuler");
        }
        var optionDial = Ti.UI.createOptionDialog({
          options : opt,
          cancel : opt.length-1,
          title: 'Civilité :',
          destructive: opt.length-1
        });

        optionDial.addEventListener("click",function(e){
          if(opt[e.index] !== "Annuler")
          {
            lbl.setText(opt[e.index]);
            lbl.color = Alloy.CFG.COLORS.black;
            groupView.value = lbl.text;
          }
          else {
            optionDial.hide();
          }

        });
        optionDial.show();
      },

      /**
       * call - description
       *
       * @param  {type} numero description
       * @return {type}        description
       */
      call : function(numero){
        var dialog = Ti.UI.createAlertDialog({
          cancel: 1,
          buttonNames: ['Oui', 'Non'],
          message: numero,
          title: 'Composer ce numero?'
        });
        dialog.addEventListener('click', function(e){
          if (e.index === e.source.cancel){

              Ti.API.log("close dialog");
          }
          else if(e.index === 0){
            Ti.API.log("Tel: "+ numero);
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
       * turnPercentToDp - description
       *
       * @param  {type} percent description
       * @return {type}         description
       */
      turnPercentToDp: function(percent){

          var dp = 0;

          if(percent){

              if(OS_IOS){

                  if(percent > 1){
                      percent = parseFloat(percent)/100;
                  }
                  dp = Math.ceil(Ti.Platform.displayCaps.platformWidth*percent);

              }else{

                  dp = Math.round(percent)+'%';

              }

          }

          return dp;

      },

      /**
       * getHtml - description
       *
       * @param  {type} str description
       * @return {type}     description
       */
      getHtml : function(str){
        if (OS_IOS) {
          return (str ? (str.replace(/<p>/gm, '<p><br>')
          .replace(/<\/p>/gm, '<br></p>')
          .replace(/ style=\'text-align: justify;\'/gm, '')
          .replace(/<h1>/gm, '<h1><font color="#0092dd"><br>')
          .replace(/<\/h1>/gm, '</h1><br></font>')
          .replace(/<h2>/gm, '<h2><font color="#0092dd"><br>')
          .replace(/<\/h2>/gm, '</h2><br></font>')
          .replace(/<h3>/gm, '<h3><font color="#0092dd"><br>')
          .replace(/<\/h3>/gm, '</h3><br></font>')
          .replace(/<h4>/gm, '<h4><font color="#0092dd"><br>')
          .replace(/<\/h4>/gm, '</h4><br></font>')
          .replace(/<strong>/g, '<font face="'+Alloy.CFG.FONTS.medium+'" size="'+(Alloy.isHandheld ? 11 : 15) +'" color="#0092dd">')
          .replace(/<\/strong>/g, '</font>')) : '');
          //.replace(/<\/strong>/g, '</font><br>')) : '');
        }
        else {
          return (str ? (str.replace(/<p>/gm, '<p><br>')
          .replace(/<\/p>/gm, '<br></p>')
          .replace(/ style=\'text-align: justify;\'/gm, '')
          .replace(/<h1>/gm, '<h1><font color="#0092dd"><br>')
          .replace(/<\/h1>/gm, '</h1><br></font>')
          .replace(/<h2>/gm, '<h2><font color="#0092dd"><br>')
          .replace(/<\/h2>/gm, '</h2><br></font>')
          .replace(/<h3>/gm, '<h3><font color="#0092dd"><br>')
          .replace(/<\/h3>/gm, '</h3><br></font>')
          .replace(/<h4>/gm, '<h4><font color="#0092dd"><br>')
          .replace(/<\/h4>/gm, '</h4><br></font>')
          .replace(/<strong>/g, '<font face="'+Alloy.CFG.FONTS.medium+'" size="'+(Alloy.isHandheld ? 11 : 15) +'" color="#0092dd">')
          .replace(/<\/strong>/g, '</font>')) : '');
          //.replace(/<\/strong>/g, '</font><br>')) : '');
        }
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
       * humanReadableTable - description
       *
       * @param  {type} date description
       * @return {type}      description
       */
      humanReadableTable : function(date){

        var since = Alloy.Globals.moment(date),
          now = Alloy.Globals.moment(),
          diff = now.diff(since, 'hours');

        //moins de 24h
        if(diff < 24){
          return since.fromNow(true);
        //entre 24h et 48h
        }else if(diff >= 24 && diff < 48){
          return since.fromNow(true);
        //fulldate
        }else{
          return since.format('DD/MM/YYYY');
        }

      },

      /**
       * isiOS7Plus - description
       *
       * @return {type}  description
       */
      isiOS7Plus : function(){
          // iOS-specific test
          if (OS_IOS)
          {
              var version = Titanium.Platform.version.split(".");
              var major = parseInt(version[0],10);

              // Can only test this support on a 3.2+ device
              if (major >= 7)
              {
                  return true;
              }
          }
          return false;
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

        Ti.API.log('--- Ti.App.Properties.getBool(asCrash)) ' + Ti.App.Properties.getBool('asCrash'));
        if(Ti.App.Properties.getBool('asCrash')){

        	var d = Ti.UI.createAlertDialog({
        		title : 'Attention',
        		message : "Un crash de l'application a été détecté, voulez-vous envoyer l'erreur au développeur ?",
        		buttonNames : ['Oui', 'Non'],
        		cancel : 1,
        		destructive : 0
        	});

        	d.addEventListener('click', function(e){
        		Ti.API.log('--- uncaughtException click ' + JSON.stringify(Ti.App.Properties.getObject('crash')));
        		if(e.index != e.cancel){
        			Ti.App.Properties.setBool('asCrash', false);
        			var emailDialog = Ti.UI.createEmailDialog({});
        			emailDialog.subject = "Crash de l'application";
        			emailDialog.toRecipients = ['thomas@squirrel.fr'];
        			emailDialog.messageBody = 'Erreur : '+JSON.stringify(Ti.App.Properties.getObject('crash'));
        			emailDialog.open();
        		}
        	});
        	d.show();

        }
      }
  };

  module.exports = _exports;

})();
