/**
 * @class Controller.login.login
 * Display login view
 *
 */
import { AlertDialog } from "classes/ui/dialog";
var champs = $.form.getChamps();
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

	champs.password.addEventListener("click", function(e) {
		champs.password.passwordMask = !champs.password.passwordMask;
		champs.password.setPasswordMask(champs.password.passwordMask);
	});
})($.args);

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
	if (!require("core").valideEmail(e.email)) {
		require("core").alertSimple(L("warning"), L("emailInvalidMsg"));
		return false;
	}

	if (e.password && e.email) {
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
			updatedAt: new Date().toString(),
		});
		Ti.App.Properties.setBool("isConnected", true);
		Alloy.createController("index").getView();
	}
}

//TUTORIEL EXAMPLE
if (Ti.App.Properties.getBool("showTutorial")) {
	var tutorial = Alloy.createWidget("fr.squirrel.tutorial", {
		indicatorSelect: {
			backgroundColor: "black",
		},
		indicatorUnselect: {
			backgroundColor: "white",
		},
		titleBtnStart: L("next"),
		titleBtnEnd: L("close"),
		success: function(e) {
			tutorial.close();
			Ti.App.Properties.setBool("showTutorial", false);
		},
	});

	var pages = [
		{
			page: {
				backgroundColor: Alloy.CFG.COLORS.main,
			},
			title: {
				text: "Lorem ipsum dolor.",
			},
			subtitle: {
				text:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin magna eget velit aliquet, id facilisis nulla commodo. Fusce a hendrerit dolor, sed volutpat lacus.",
			},
			logo: {
				image: "/images/common/logo.png",
			},
		},
		{
			page: {
				backgroundColor: Alloy.CFG.COLORS.main,
			},
			title: {
				text: "Curabitur scelerisque justo.",
			},
			subtitle: {
				text: "Nam viverra gravida quam varius aliquam",
			},
			logo: {
				image: "/images/common/logo.png",
			},
		},
		{
			page: {
				backgroundColor: Alloy.CFG.COLORS.main,
			},
			title: {
				text: "Cras in tincidunt eros.",
			},
			subtitle: {
				text:
					"Aenean fringilla mi sit amet luctus tristique. Cras ultrices dolor non lacus bibendum tristique.",
			},
			logo: {
				image: "/images/common/logo.png",
			},
		},
	];

	$.win.addEventListener("open", function() {
		tutorial.setPages(pages);
	});
}
