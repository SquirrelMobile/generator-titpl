/**
 * @class Controller.signup.signup
 * Display signup view
 *
 */

/**
 * @method Controller
 * Display signup view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args){

  $.navbar.load({
    back : {
      visible : true
    },
    title : {
      visible : true,
      text : 'Inscription'
    }
  });

})($.args);


/**
 * submit - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function submit(e){

  var lastname = require("core").requiredField($.lastname);
  var firstname = require("core").requiredField($.firstname);
  var password = require("core").requiredField($.password);
  var email = require("core").requiredField($.email);

  if(lastname && firstname && email && password){

    var obj = {
      lastname : $.lastname.value,
      firstname : $.firstname.value,
      password : $.password.value,
      email : $.email.value
    };
    //Alloy.Globals.loading.show("Chargement...");
    /*Alloy.Globals.Api.signup({body : obj }, function(e){

    });*/
    Ti.UI.createAlertDialog({
      title : 'Confirmation',
      message : 'Votre compte a bien été créé'
    }).show();
    close();
  }

}


/**
 * close - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function close(e){
  $.win.close();
}

/**
 * next - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function next(e){

  if($[e.source.next])
    $[e.source.next].focus();

}
