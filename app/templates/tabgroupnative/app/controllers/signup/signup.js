/**
 * @class Controller.signup.signup
 * Display signup view
 *
 */

var champs = $.form.getChamps();

// champs.cgu.label.addEventListener("click", function() {
// 	Ti.Platform.openURL("http://google.com");
// });
/**
 * @method Controller
 * Display signup view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
	_.each(champs, function(e, key) {
		console.log(key);
	});
	champs.cgu.label.addEventListener("click", function() {
		//alert("");
	});
})($.args);

/**
 * submit - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function submit(e) {
	// Alloy.Globals.loading.show(L("loading"));
	// //WS LOGIN
	// Alloy.Globals.Api.signup({ body: _.omit(obj, "passwordConfirm") }, function(
	//   e
	// ) {
	//   if (e.success) {
	require("core").alertSimple(L("confirmation"), L("createAccountConfirm") + JSON.stringify(e));
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
