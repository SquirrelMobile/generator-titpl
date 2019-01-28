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
    btnLeft : {
      visible : true
    },
    title : {
      visible : true,
      text : L('signup')
    }
  });

  $.lastname.listener('return', function(){
    $.firstname.focus();
  });

  $.firstname.listener('return', function(){
    $.email.focus();
  });

  $.email.listener('return', function(){
    $.password.focus();
  });

  $.password.listener('return', function(){
    submit();
  });


})($.args);


/**
 * submit - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function submit(e){

  var lastname = $.lastname.getValue();
  var firstname = $.firstname.getValue();
  var password = $.password.getValue();
  var email = $.email.getValue();

  if(!require('core').valideEmail(email)){
    Ti.UI.createAlertDialog({
      title : L('warning'),
      message : L('emailInvalidMsg')
    }).show();
    return false;
  }

  if(lastname && firstname && email && password){

    var obj = {
      lastname : lastname,
      firstname : firstname,
      password : password,
      email : email
    };
    //Alloy.Globals.loading.show(L('loading'));
    /*Alloy.Globals.Api.signup({body : obj }, function(e){

    });*/
    Ti.UI.createAlertDialog({
      title : L('confirmation'),
      message : L('createAccountConfirm')
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
