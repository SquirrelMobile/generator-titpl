exports.createWindow = function(args) {
	if (OS_IOS) {
		return Ti.UI.createWindow(args);
	} else {
		return Ti.UI.createView(args);
	}
};

exports.createTextArea = function(args) {
	var $textArea = Ti.UI.createTextArea(args);

	if (args.hintText) {
		$textArea.originalColor = $textArea.color || "#000";
		if (!$textArea.value) {
			$textArea.applyProperties({
				value: $textArea.hintText,
				color: "#717171",
			});
		}

		$textArea.addEventListener("focus", function(e) {
			if (e.source.value == e.source.hintText) {
				e.source.applyProperties({
					value: "",
					color: e.source.originalColor,
				});
			}
		});

		$textArea.addEventListener("blur", function(e) {
			if (!e.source.value) {
				e.source.applyProperties({
					value: e.source.hintText,
					color: "#717171",
				});
			}
		});
	}
	if (OS_IOS) {
		var toolbar = Alloy.createController("/partials/keytoolbarios", args);

		$textArea.addEventListener("reload", function(e) {
			toolbar.reload(e);
		});

		toolbar.on("close", function() {
			$textArea.blur();
		});

		toolbar.on("previous", function() {
			$textArea.fireEvent("previous");
		});

		toolbar.on("next", function() {
			$textArea.fireEvent("return");
		});

		$textArea.keyboardToolbar = toolbar.getView();
	}

	return $textArea;
};

exports.createLabel = function createLabel(args) {
	if (OS_IOS && args.html) {
		var html = args.html;

		delete args.text;
		delete args.html;

		var label = Ti.UI.createLabel(args);
		var ref = label;

		var html2as = require("nl.fokkezb.html2as");

		html2as(html, function(err, attr) {
			if (err) {
				console.error(err);
			} else {
				ref.attributedString = attr;
			}

			ref = null;
		});

		return label;
	} else {
		return Ti.UI.createLabel(args);
	}
};

// helper
var isAndroid = Ti.Platform.osname == "android";

/**
 * Fixes the auto focus on textfield on android
 */
exports.createTextField = function(args) {
	if (isAndroid) {
		var view = Ti.UI.createTextField(args);

		// fix auto focus
		// view.addEventListener('focus', function focusFix(e) {
		//     e.source.blur();
		//     e.source.removeEventListener('focus', focusFix);
		// });
		return view;
	} else {
		var toolbar = Alloy.createController("/partials/keytoolbarios", args);
		var textField = Ti.UI.createTextField(args);

		textField.addEventListener("reload", function(e) {
			toolbar.reload(e);
		});

		toolbar.on("close", function() {
			textField.blur();
		});

		toolbar.on("previous", function() {
			textField.fireEvent("previous");
		});

		toolbar.on("next", function() {
			textField.fireEvent("return");
		});

		textField.keyboardToolbar = toolbar.getView();

		return textField;
	}
};

exports.createView = function(args) {
	if (args.shadowStyle) {
		if (OS_IOS) {
			return Ti.UI.createView(
				_.extend(args, {
					viewShadowColor: "#55000000",
					viewShadowOffset: { x: 0, y: args.offset ? args.offset : 5 },
					viewShadowRadius: 3,
				}),
			);
		} else {
			var opt = {};
			if (!args.borderRadius) {
				opt = { borderRadius: 0 };
			}
			return Ti.UI.Android.createCardView(_.extend(args, opt));
		}
	} else if (args.clickStyle) {
		if (OS_IOS) {
			var view = Ti.UI.createView(args);
			view.addEventListener("touchStart", function() {
				view.opacity = 0.3;
			});
			view.addEventListener("touchEnd", function() {
				view.opacity = args.opacity ? args.opacity : 1;
			});
			return view;
		} else {
			return Ti.UI.createView(
				_.extend(args, {
					backgroundColor: "white",
					touchFeedback: true,
					touchFeedbackColor: Alloy.CFG.COLORS.main,
				}),
			);
		}
	} else {
		return Ti.UI.createView(
			_.extend(args, {
				backgroundColor: "white",
				touchFeedback: true,
				touchFeedbackColor: Alloy.CFG.COLORS.main,
			}),
		);
	}
};

exports.createOptionDialog = function(args) {
	if (OS_ANDROID) {
		var TiBottomSheet = require("ti.bottomsheet");
		var optionDialog = TiBottomSheet.createOptionDialog(args);
		return optionDialog;
	} else {
		var optionDialog = Ti.UI.createOptionDialog(args);
		return optionDialog;
	}
};
