/**
 * @class Controller.lostPassword.lostPassword
 * Display lostPassword view
 *
 */
var champs = $.form.getChamps();
/**
 * @method Controller
 * Display lostPassword view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
	// champs.email.addEventListener("change", handleBtnSend);

	function handleBtnSend() {
		if (champs.email.getValue() !== "") {
			champs.valid.opacity = 1;
		} else {
			champs.valid.opacity = 0.3;
		}
	}
})($.args);

/**
 * submit - submit function
 *
 * @param  {type} e description
 */
function submit(e) {
	if (!require("core").valideEmail(e.email)) {
		require("core").alertSimple(L("warning"), L("emailInvalidMsg"));
		return false;
	}

	if (e.email) {
		require("core").alertSimple(L("confirmation"), L("emailSendMsg"));
		close();
	}
}

/**
 * close - Close the window
 *
 * @param  {type} e description
 * @return {type}   description
 */
function close(e) {
	$.win.close();
}
