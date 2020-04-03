/**
 * @class Controller.partials._navbar
 * Create a _navbar
 */

/**
 * @method Controller
 * Create a _navbar view
 * @param  {Object} args Arguments passed to the controller
 */
(function constructor(args) {
	if (args) {
		load(args);
	}
})($.args);

/**
 * actions - description
 *
 * @param  {type} e description
 * @return {type}   description
 */
function actions(e) {
	$.trigger("click", { type: e.source.type });
}

function load(conf) {
	if (conf.nav) {
		$.nav.applyProperties(conf.nav);
		if (conf.nav.backgroundColor) {
			$.container.backgroundColor = conf.nav.backgroundColor;
		}
	}

	if (conf.btnLeft) {
		$.btnLeft.applyProperties(conf.btnLeft);
	}

	if (conf.btnRight) {
		$.btnRight.applyProperties(conf.btnRight);
	}

	if (conf.logo) {
		$.logo.applyProperties(conf.logo);
	}

	if (conf.title) {
		$.title.applyProperties(conf.title);
	}
}
/**
 * load - description
 *
 * @param  {type} conf description
 * @return {type}      description
 */
$.load = load;
