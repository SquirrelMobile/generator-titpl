/**
 * @class Controller.signup.signup
 * Display signup view
 *
 */

var champs = $.form.getChamps();
champs.cgu.listener("click", function() {
  Ti.Platform.openURL("http://google.com");
});
/**
 * @method Controller
 * Display signup view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
  $.navbar.load({
    back: {
      visible: true,
      backgroundColor: "white"
    },
    nav: {
      backgroundColor: "white"
    }
  });
})($.args);

/**
 * submit - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function submit(e) {
  if (champs.password.getValue() !== champs.passwordConfirm.getValue()) {
    require("core").alertSimple(L("warning"), L("password"));
    return false;
  }

  if (!require("core").valideEmail(champs.email.getValue())) {
    require("core").alertSimple(L("warning"), L("emailInvalidMsg"));
    return false;
  }
  // Alloy.Globals.loading.show(L("loading"));
  // //WS LOGIN
  // Alloy.Globals.Api.signup({ body: _.omit(obj, "passwordConfirm") }, function(
  //   e
  // ) {
  //   if (e.success) {
  require("core").alertSimple(
    L("confirmation"),
    L("createAccountConfirm") + JSON.stringify(e)
  );
  close();
  // }
  // });
}

/**
 * close - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function close(e) {
  $.win.close();
}
