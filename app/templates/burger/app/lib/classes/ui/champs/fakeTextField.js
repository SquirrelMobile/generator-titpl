import { TextField } from "classes/ui/champs/textField";

class FakeTextField extends TextField {
	constructor(obj) {
		super(obj);
		this.fieldView.remove(this.textField);
		this.createAndSetView(
			"faketextField",
			"createLabel",
			_.extend(this.defaultParams && this.defaultParams.textField, {
				text: obj.textField ? obj.textField.hintText : "",
				color: Alloy.CFG.COLORS.hintText,
				height: Ti.UI.FILL,
			}),
			obj.textField,
		);

		this.fieldView.add(this.faketextField);
	}

	focus() {
		this.container.fireEvent("click");
	}

	getValue() {
		return this.faketextField ? this.faketextField.value : null;
	}

	setValue(val) {
		this.faketextField.text = val;
		this.faketextField.color = "black";
	}
}

exports.FakeTextField = FakeTextField;

exports.createView = e => {
	let textfield = new FakeTextField(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
