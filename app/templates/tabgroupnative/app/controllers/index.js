/**
 * @class Controller.index
 * Display index view
 *
 */

/**
 * @method Controller
 * Display index view, load dashboard or login
 * @param  {Arguments} args Arguments passed to the controller
 */

(function constructor(args) {
	if (Ti.App.Properties.getBool("isConnected")) {
		Alloy.createController("dashboard")
			.getView()
			.open();
	} else {
		Alloy.createController("login/login", args)
			.getView()
			.open();
	}
})($.args);
