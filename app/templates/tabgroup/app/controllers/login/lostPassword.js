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
    btnLeft : {
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

  var email = $.email.getValue();

  if(!require('core').valideEmail(email)){
    Ti.UI.createAlertDialog({
      title : L('warning'),
      message : L('emailInvalidMsg')
    }).show();
    return false;
  }

  //Alloy.Globals.loading.show(L('loading'));
  /*Alloy.Globals.Api.lostPassword({body :{email : $.email.value}}, function(e){

  });*/
  Ti.UI.createAlertDialog({
    title : L('confirmation'),
    message : L('emailSendMsg')
  }).show();
  close();


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
