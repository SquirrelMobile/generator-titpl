/**
 * @class Controller.lostPassword.lostPassword
 * Display lostPassword view
 *
 */

/**
 * @method Controller
 * Display lostPassword view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    back : {
      visible : true
    },
    logo : {
      visible : true
    }
  });

})($.args);


/**
 * submit - submit function
 *
 * @param  {type} e description
 */
function submit(e){

  if(require("core").requiredField($.email)){
    //Alloy.Globals.loading.show("Chargement...");
    /*Alloy.Globals.Api.lostPassword({body :{email : $.email.value}}, function(e){

    });*/
    Ti.UI.createAlertDialog({
      title : 'Confirmation',
      message : 'Un email vient de vous être envoyé'
    }).show();
    close();
  }

}


/**
 * close - Close the window
 *
 * @param  {type} e description
 * @return {type}   description
 */ 
function close(e){
  $.win.close();
}
