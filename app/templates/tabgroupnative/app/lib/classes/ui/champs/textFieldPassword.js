import { TextField } from "classes/ui/champs/textField";

class TextFieldPassword extends TextField {
	constructor(obj) {
		super(obj);
		this.minLength = obj.minLength || 6;
		this.createButton(
			{
				title: "\uf06e",
			},
			"buttonRight",
		);
		this.textField.passwordMask = true;
		var that = this;
		this.buttonRight.addEventListener("click", function() {
			that.textField.passwordMask = !that.textField.passwordMask;
			that.buttonRight.title = that.textField.passwordMask ? "\uf06e" : "\uf070";
			that.textField.setPasswordMask(that.textField.passwordMask);
		});
	}

	checkError(obj) {
		return this.textField.value.length > this.minLength ? false : this.errors.PASSWORD_NOT_LENGTH;
	}
}

exports.TextFieldPassword = TextFieldPassword;

exports.createView = e => {
	let textfield = new TextFieldPassword(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
