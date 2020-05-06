import { TextField } from "classes/ui/champs/textField";

class TextFieldEmail extends TextField {
	constructor(obj) {
		super(obj);
		this.createButton(
			{
				title: "\uf0e0",
			},
			"buttonRight",
		);
		this.textField.applyProperties({
			autofillType: Titanium.UI.AUTOFILL_TYPE_EMAIL,
			autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
			keyboardType: Titanium.UI.KEYBOARD_TYPE_EMAIL,
		});
	}

	checkError() {
		return this.getValue() !== null && this.valideEmail(this.getValue())
			? false
			: this.errors.EMAIL_NOT_VALIDATED;
	}

	valideEmail(valeur) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
	}
}

exports.TextFieldEmail = TextFieldEmail;

exports.createView = e => {
	let textfield = new TextFieldEmail(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
