import { FakeTextField } from "classes/ui/champs/fakeTextField";
// import { Dialog } from "classes/ui/genericDialog";

class TextFieldOptionDialog extends FakeTextField {
	constructor(obj) {
		super(obj);
		this.createButton(
			{
				title: "\uf0d7",
			},
			"buttonRight",
		);
		var that = this;
		this.optionDialog = obj.optionDialog;
		this.container.addEventListener("click", function() {
			if (that.optionDialog) {
				let options = require("xp.ui").createOptionDialog(that.optionDialog);
				options.addEventListener("click", event => {
					if (that.optionDialog.options && that.optionDialog.options[event.index]) {
						that.faketextField.applyProperties({
							text: that.optionDialog.options[event.index],
							value: that.optionDialog.options[event.index],
							color: Alloy.CFG.COLORS.black,
						});
					}
				});
				options.show();
			}
		});
	}

	getValue() {
		return this.faketextField ? this.faketextField.value : null;
	}

	setValue(val) {
		this.faketextField.text = val;
		this.faketextField.value = val;
	}
}

exports.TextFieldOptionDialog = TextFieldOptionDialog;

exports.createView = e => {
	let textfield = new TextFieldOptionDialog(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
