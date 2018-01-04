/**
 * @class Lib.net.apiconfig
 * net lib
 */
function alertDialog(text,title){
	Ti.UI.createAlertDialog({
		title : title,
		message : text,
		ok : "OK"
	}).show();
}

(function(){
	var _methods = [
	        {
	      	  name: 'signin',
						post: '/api/v1/sessions',
						onError : function(response, e){
							Alloy.Globals.loading.hide();
							alertDialog("Mauvais identifiant ou mot de passe","Erreur");
							Ti.API.error('--- error=' + JSON.stringify(response) + JSON.stringify(e) );
						},
        	},
					{
	      	  name: 'lostPassword',
						post: '/api/v1/lost_password'
        	},
					{
        	  name: 'showUser',
        		get: '/api/v1/users/<id>'
        	}
  ];

	var _exports = {
			baseurl : Alloy.CFG.baseurl,

	    /**
	     * init - description
	     *
	     * @return {type}  description
	     */
	    init : function(){
	        //doc https://github.com/jasonkneen/RESTe
	        var reste = require('reste');

	        var api = new reste();

	        api.config({
	            debug : true,
	            autoValidateParams : false,
							validatesSecureCertificate : false,
	            timeout : -1,
	            url : _exports.baseurl,
	            requestHeaders: {
	                "Content-Type": "application/json"
	            },
	            methods : _methods,
	            onError : function(response, e){
              	Alloy.Globals.loading.hide();
								if (OS_IOS) {
									Ti.API.error('--- error=' + JSON.stringify(response) + " " + JSON.stringify(e));
								}
	            },
	            onLoad : function(response, callback){

	            	Ti.API.debug('--- onload=' + JSON.stringify(response));

	              Alloy.Globals.loading.hide();

	              callback(response);

	            }
	        });

	        Alloy.Globals.Api = api;

	    },
			//EXAMPLE
			/*var zipname = 'test.zip';
			var dir = Ti.Filesystem.applicationDataDirectory;
			var url = 'http://localhost:8888/directory/';

			require('net/apiconfig').getZipFileFromNet({
				weblink : url,
				directory : dir,
				zipname : zipname,
				success : function(){
					require('/media').decompressionZip({
						zipname : zipname,
						directory : dir,
						destinationFolder : dir,
						success : function(){
							Ti.API.log('--- success download + dezip');
			      	// var readFile = Titanium.Filesystem.getFile(dir, "data.json");
							//
				      // if(readFile.exists()) {
							//
				      //   try{
							//
				      //     var content = JSON.parse(readFile.read().text);
				      //     require('dao/database').setTable('tableName',content);
							//
				      //   }catch(e){
							//
				      //     Ti.UI.createAlertDialog({
				      //       title : 'Erreur',
				      //       message : 'Impossible de lire le fichier des données' + e
				      //     }).show();
							//
				      //   }
							//
				      // }else{
							//
				      //   Ti.UI.createAlertDialog({
				      //     title : 'Erreur',
				      //     message : 'Erreur lors de l\'importation des données'
				      //   }).show();
							//
				      // }

						}
					});
				}
			});*/

			/**
			 * getZipFileFromNet - description
			 *
			 * @param  {type} o description
			 * @return {type}   description
			 */
			getZipFileFromNet : function(o){

				var weblink = o.weblink,
						directory = o.directory || Ti.Filesystem.applicationDataDirectory,
						zipname = o.zipname,
						success = o.success || function(){};

			      Alloy.Globals.loading.show('Chargement...');

			      var client = Ti.Network.createHTTPClient({
		            onload : function(e) {
		              Alloy.Globals.loading.hide();
		              Ti.API.log('--- onload e' + JSON.stringify(e));

	                setTimeout(function(){
										if(success){
											success();
										}
	                },1000);

		            },
		            onerror : function(e) {
		              Alloy.Globals.loading.hide();
		              Ti.API.error('onerror ' + JSON.stringify(e));
		            }
		        });

		        Ti.API.log(' GET => '+weblink);
		        client.open("GET", weblink);
		        client.setFile(directory + zipname);
		        client.send();

	    }
	};

	module.exports = _exports;

})();
