/**
 * @class Controller.login.login
 * Display login view
 *
 */

/**
 * @method Controller
 * Display login view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
  if (args.closeApp && OS_ANDROID) {
    $.win.addEventListener("androidback", function() {
      var activity = Titanium.Android.currentActivity;
      activity.finish();
    });
  }

  // $.login.listener("return", function() {
  //   $.password.focus();
  // });
  //
  // $.password.listener("return", function() {
  //   connect();
  // });
  //
  // var _toFlag = false;
  // $.password.clickIconAction(function(e) {
  //   $.password.setPasswordMask(_toFlag);
  //   $.password.setIconAction(_toFlag ? "\uf070" : "\uf06e");
  //   _toFlag = !_toFlag;
  // });
})($.args);

function activePasswordMask(e) {
  Alloy.Globals.log.info("activePasswordMask");

  var isMasked = $.password.lblRight.text === "\uf06e";
  $.password.textfield.setPasswordMask(isMasked);
  $.password.lblRight = {
    text: !isMasked ? "\uf06e" : "\uf070",
    color: "gray"
  };
}

function previous(e) {
  if ($[e.source.previous]) $[e.source.previous].focus();
}

/**
 * openWin - open Signup or Lost password
 *
 * @param  {Object} e clicked object
 */
function openWin(e) {
  var type = e.source.type;
  var controller = "";

  switch (type) {
    case "signup":
      controller = "signup/signup";
      break;
    case "lostPassword":
      controller = "login/lostPassword";
    default:
      break;
  }

  $.nav.openWindow(Alloy.createController(controller, e).getView());
}

/**
 * connect - connection function
 *
 * @param  {object} e
 */
function connect(e) {
  var password = $.password.getValue();
  var login = $.login.getValue();

  if (!require("core").valideEmail(login)) {
    Ti.UI.createAlertDialog({
      title: L("warning"),
      message: L("emailInvalidMsg"),
      ok: L("ok")
    }).show();
    return false;
  }

  if (password && login) {
    /*Alloy.Globals.loading.show(L("loading"));
      //WS LOGIN
      var obj = {
        email : $.login.getValue(),
        password : $.password.getValue()
      };

      Alloy.Globals.Api.signin({body:obj},function(e){

      });*/
    Ti.App.Properties.setObject("user", {
      _id: 1,
      gender: "m",
      lastname: "Marston",
      firstname: "John",
      email: "john@test.fr",
      phone: "0692012345",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    });
    Ti.App.Properties.setBool("isConnected", true);
    Alloy.createController("index").getView();
  }
}

/**
 * next - focus next field
 *
 * @param  {object} e field
 */
function next(e) {
  if ($[e.source.next]) $[e.source.next].focus();
}

//TUTORIEL EXAMPLE
if (Ti.App.Properties.getBool("showTutorial")) {
  var tutorial = Alloy.createWidget("fr.squirrel.tutorial", {
    indicatorSelect: {
      image: "/images/ellipseblue.png"
    },
    indicatorUnselect: {
      image: "/images/ellipseblueinactive.png"
    },
    titleBtnStart: L("next"),
    titleBtnEnd: L("close"),
    success: function(e) {
      tutorial.close();
      Ti.App.Properties.setBool("showTutorial", false);
    }
  });

  var pages = [
    {
      page: {
        backgroundColor: Alloy.CFG.COLORS.main
      },
      title: {
        text: "Lorem ipsum dolor."
      },
      subtitle: {
        text:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin magna eget velit aliquet, id facilisis nulla commodo. Fusce a hendrerit dolor, sed volutpat lacus."
      },
      logo: {
        image: "/images/common/logo.png"
      }
    },
    {
      page: {
        backgroundColor: Alloy.CFG.COLORS.main
      },
      title: {
        text: "Curabitur scelerisque justo."
      },
      subtitle: {
        text: "Nam viverra gravida quam varius aliquam"
      },
      logo: {
        image: "/images/common/logo.png"
      }
    },
    {
      page: {
        backgroundColor: Alloy.CFG.COLORS.main
      },
      title: {
        text: "Cras in tincidunt eros."
      },
      subtitle: {
        text:
          "Aenean fringilla mi sit amet luctus tristique. Cras ultrices dolor non lacus bibendum tristique."
      },
      logo: {
        image: "/images/common/logo.png"
      }
    }
  ];

  $.win.addEventListener("open", function() {
    this.removeEventListener("open", arguments.callee);
    tutorial.setPages(pages);
  });
}
