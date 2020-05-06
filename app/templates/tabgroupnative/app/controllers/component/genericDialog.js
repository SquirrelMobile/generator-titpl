//Popup utile pour afficher titre et un contenu custom
var args = $.args;
var loader = null;
console.log("generic dialog ", args);
if (args.title) {
	$.title.applyProperties(args.title);
}

if (args.content) {
	addContentFn(args.content);
}

if (args.loader) {
	loader = require("ti.animation").createAnimationView({
		height: 100,
		width: 100,
		zIndex: 99,
		visible: true,
		loop: true,
		autoStart: true,
		file: "animLoader.json",
	});

	$.content.add(loader);
}

if (OS_IOS) {
	$.win.modal = args.modal;
}

$.stopLoader = function() {
	if (loader) {
		loader.stop();
	}
};

$.playLoader = function() {
	if (loader) {
		loader.start();
	}
};

function addContentFn(content) {
	$.content.removeAllChildren();
	$.content.add(args.content);
}

$.addContent = addContentFn;

function handleOpen(e) {
	if (loader) {
		setTimeout(function() {
			loader.start();
		}, 50);
	}
	var matrix = Ti.UI.create2DMatrix();
	var matrix1 = matrix.scale(0.1, 0.1);
	var matrix2 = matrix.scale(1, 1);
	var matrix3 = matrix.scale(1.12, 1.1);
	$.main.transform = matrix1;
	setTimeout(function() {
		$.main.animate({ transform: matrix3, opacity: 1.2, duration: 150 }, function() {
			matrix = matrix.scale(1, 1);
			$.main.animate({ transform: matrix2, opacity: 1, duration: 200 }, function() {
				$.main.opacity = 1;
				$.main.transform = matrix;
				($.main.height = Ti.UI.SIZE), ($.main.width = Ti.UI.FILL);
			});
		});
	}, 0);
}

function closeWin() {
	var matrix = Ti.UI.create2DMatrix();
	var matrix1 = matrix.scale(0.1, 0.1);
	var matrix3 = matrix.scale(1.12, 1.1);
	setTimeout(function() {
		$.main.animate({ transform: matrix3, opacity: 1.2, duration: 150 }, function() {
			$.main.animate({ transform: matrix1, opacity: 1, duration: 200 }, function() {
				if (OS_IOS) {
					$.win.close({ animated: false });
				} else {
					$.win.close({
						activityEnterAnimation: Ti.Android.R.anim.fade_out,
					});
				}
			});
		});
	}, 100);
}
$.close = closeWin;
if (OS_ANDROID) {
	$.win.addEventListener("androidback", function() {});
}
function handleTouch(e) {
	if (
		OS_ANDROID &&
		e.source.apiName !== "Ti.UI.TextField" &&
		e.source.apiName !== "Ti.UI.TextArea"
	) {
		Ti.UI.Android.hideSoftKeyboard();
	}
}

$.open = function() {
	if (OS_IOS) {
		let config = {
			animated: true,
		};
		if (args.modalStyle) {
			_.extend(config, args.modalStyle);
		}
		$.win.open(config);
	} else {
		$.win.open({
			activityEnterAnimation: Ti.Android.R.anim.fade_in,
		});
	}
};
