var args = $.args;
import { AlertDialog } from "classes/ui/dialog";
var champs = [];

//Create fields
_.each(args.champs, function(e, i) {
	var nbGroupId = _.filter(args.champs, function(filter) {
		return filter.groupId === e.groupId && filter.groupId;
	});

	addField(_.extend(e, { default: args.default }), i, nbGroupId.length);
	//if label type
	if (e && e.type === "label") {
		let champ = Ti.UI.createLabel(args.default && args.default.label);
		champ.applyProperties(e);
		$.container.add(champ);
	} else if (e.type === "valid") {
		//if valid type
		let champ = require("/classes/ui/button").createButtonWithIcon(
			_.extend(args.default && args.default.button, e),
		);
		champ.addEventListener("click", handleValid);
		$.container.add(champ);
	}
});

//Click event for valid type field
function handleValid() {
	var obj = {};
	_.each(champs, function(e, i) {
		if (e.type !== "valid") {
			obj[e.id] = e.getValue();
		}
	});
	if (verif(champs)) {
		$.trigger("valid", obj);
	}
}

//Check if each required field is filled and check if the format of the fields is ok
function verif(obj) {
	var d = [];
	_.each(obj, function(elem) {
		if (elem.required && (!elem.getValue() || elem.getValue() === "")) {
			var keyEntire = elem.title ? elem.title.text : elem.id;
			if (keyEntire !== "") {
				d.push(keyEntire.replace(/\*/g, ""));
			}
		}
	});
	if (d.length > 0) {
		var d = new AlertDialog({
			title: L("warning"),
			message: {
				top: 10,
				text: L("dialog.missingsField") + "\n\n" + d.join("\n"),
			},
			confirm: {
				text: L("OK"),
				top: 30,
				backgroundColor: Alloy.CFG.COLORS.main2,
				touchFeedback: true,
				color: "white",
				width: "99%",
				click: function() {
					d.hide();
				},
			},
		});
		d.show();
		return false;
	}
	var error = [];
	_.each(obj, function(e) {
		if (_.isFunction(e.checkError)) {
			if (e.checkError()) {
				error.push(e.checkError().text);
			}
		}
	});
	if (error.length > 0) {
		var d = new AlertDialog({
			title: L("warning"),
			message: {
				top: 10,
				text: error.join("\n"),
			},
			confirm: {
				text: L("OK"),
				top: 30,
				backgroundColor: Alloy.CFG.COLORS.main2,
				touchFeedback: true,
				color: "white",
				width: "99%",
				click: function() {
					d.hide();
				},
			},
		});
		d.show();
		return false;
	}
	return true;
}

//add the different types of fields, and checking if the class exists
function addField(e, i, size) {
	if (
		_.indexOf(
			[
				"textFieldList",
				"textArea",
				"textFieldDate",
				"textFieldEmail",
				"textFieldPassword",
				"fakeTextField",
				"textFieldGenericPopup",
				"textFieldPhone",
				"textFieldNumber",
				"textFieldOptionDialog",
				"photoSelector",
				"textField",
				"checkbox",
				"buttonsMultiple",
				"map",
			],
			e.type,
		) > -1
	) {
		var champ = require("/classes/ui/champs/" + e.type).createView(
			_.extend(
				{
					next: args.champs[i + 1] ? args.champs[i + 1] : null,
					previous: args.champs[i - 1] ? args.champs[i - 1] : null,
				},
				e,
			),
		);
		champs.push(champ.super());
		if (e.groupId) {
			var id = "groupId" + e.groupId;
			var find = $.container.getViewById(id);
			var create = false;
			if (!find) {
				create = true;
				find = Ti.UI.createView({
					id: id,
					height: Ti.UI.SIZE,
					width: Ti.UI.FILL,
					layout: "horizontal",
					horizontalWrap: false,
				});
			}

			champ.super().parent.applyProperties({
				width: (1 / size) * 100 + "%",
				height: Ti.UI.SIZE,
			});
			find.add(champ);
			if (create) {
				$.container.add(find);
			}
		} else {
			$.container.add(champ);
		}
	}
}

// retrieve all the fields except the valid type
function getChamps() {
	var obj = {};
	_.each(champs, function(e) {
		obj[e.id] = e;
	});
	return obj;
}
$.getChamps = getChamps;

// execute the blur method on all fields
function blurAll(e) {
	_.each(champs, function(champ) {
		if (champ.blur) {
			champ.blur();
		}
	});
}
$.blurAll = blurAll;

// Focus on the following field for iOS (Android = default behavior)
function handleNext(e) {
	if (OS_IOS) {
		var id = e.source.next.id;
		var find = _.findWhere(champs, { id: id });
		if (find) {
			find.focus();
		}
	}
}

// Focus on the previous field for iOS
function handlePrevious(e) {
	var id = e.source.previous.id;
	var find = _.findWhere(champs, { id: id });
	if (find) {
		find.focus();
	}
}
