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
(function constructor(args) {
  $.navbar.load({
    back: {
      visible: true
    },
    nav: {
      backgroundColor: "white"
    },
    title: {
      text: L("register")
    }
  });
})($.args);

function previous(e) {
  Alloy.Globals.log.info("previous", e.source.previous);
  if ($[e.source.previous]) $[e.source.previous].focus();
}
/**
 * submit - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function submit(e) {
  var obj = {
    lastname: $.lastname.getValue(),
    firstname: $.firstname.getValue(),
    email: $.email.getValue(),
    phone: $.phone.getValue(),
    password: $.password.getValue(),
    passwordConfirm: $.passwordConfirm.getValue()
    // state: "STEP1"
  };

  if (
    obj.lastname &&
    obj.firstname &&
    obj.email &&
    obj.phone &&
    obj.password &&
    obj.passwordConfirm
  ) {
    if (obj.password !== $.passwordConfirm.getValue()) {
      Ti.UI.createAlertDialog({
        title: L("warning"),
        message: L("password"),
        ok: "OK"
      }).show();
      return false;
    }
    if (!require("core").valideEmail(obj.email)) {
      Ti.UI.createAlertDialog({
        title: L("warning"),
        message: L("emailInvalidMsg"),
        ok: "OK"
      }).show();
      return false;
    }
    // Alloy.Globals.loading.show(L("loading"));
    // //WS LOGIN
    // Alloy.Globals.Api.signup({ body: _.omit(obj, "passwordConfirm") }, function(
    //   e
    // ) {
    //   if (e.success) {
    Ti.UI.createAlertDialog({
      title: L("confirmation"),
      message: L("createAccountConfirm")
    }).show();
    close();
    // }
    // });
  } else {
    var d = [];
    _.each(obj, function(elem, key) {
      if (!elem) {
        var view = $[key];
        if (view) {
          if (view.textfield.required) {
            var keyEntire = "form." + key;
            d.push(L(keyEntire) + "");
          }
        }
      }
    });

    Ti.UI.createAlertDialog({
      title: L("warning"),
      message: "Champs manquants : \n" + d.join("\n"),
      ok: "OK"
    }).show();
    return false;
  }
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

function activePasswordMask(e) {
  Alloy.Globals.log.info("activePasswordMask");

  var isMasked = $.password.lblRight.text === "\uf06e";
  $.password.textfield.setPasswordMask(isMasked);
  $.password.lblRight = {
    text: !isMasked ? "\uf06e" : "\uf070",
    color: "gray"
  };
}

/**
 * next - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function next(e) {
  if ($[e.source.next]) $[e.source.next].focus();
}
