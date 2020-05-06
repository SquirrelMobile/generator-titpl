var args = $.args;

/**
 * @method Controller
 * Display login view
 * @param  {Arguments} args Arguments passed to the controller
 */
(function constructor(args) {
	load(require(WPATH("country")));
	$.title.backgroundColor = args.bgTitle;
})($.args);

function load(data) {
	if (data) {
		var d = [];

		_.each(data, function(e) {
			d.push({
				template: "callingCode",
				properties: _.extend(e, { searchableText: e.name + "" }),
				title: {
					text: e.name + " (" + e.countryCallingCodes.join(" | ") + ")",
				},
				emoji: {
					text: e.emoji,
				},
			});
		});
		if (d.length > 0) {
			$.listview.setSections([Ti.UI.createListSection({ items: d })]);
		}
	}
}

$.load = load;

function handleClick(e) {
	var row = e.section.getItemAt(e.itemIndex),
		prop = row.properties;

	$.trigger("selectCountry", prop);
	close();
}

function close(e) {
	$.win.close();
}
