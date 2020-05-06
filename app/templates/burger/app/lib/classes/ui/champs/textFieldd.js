import { Field } from "classes/ui/champs/field";

class TextField extends Field {
	constructor(obj) {
		super(obj);
		this.textField = require("/xp.ui").createTextField({
			next: obj.next,
			hintText: obj.textField && obj.textField.hintText ? obj.textField.hintText : "",
			id: obj.id,
			next: obj.next,
			previous: obj.previous,
			required: obj.required,
		});
		if (this.defaultParams && this.defaultParams.textField) {
			this.textField.applyProperties(this.defaultParams.textField);
		}
		if (obj.textField) {
			this.textField.applyProperties(obj.textField);
		}
		if (OS_IOS) {
			this.textField.clearButtonMode = Titanium.UI.INPUT_BUTTONMODE_ONFOCUS;
		}
		this.fieldView.add(this.textField);

		if (obj.required) {
			this.textField.hintText = this.textField.hintText ? this.textField.hintText + " *" : "";
		}

		let that = this;
		let containerBorderColor = this.container.borderColor;
		let bottomViewColor = this.bottomView && this.bottomView.backgroundColor;
		this.textField.addEventListener("focus", function() {
			if (that.bottomView.visible == false) {
				that.container.borderColor = that.activeColor;
			} else {
				if (bottomViewColor) {
					that.bottomView.backgroundColor = that.activeColor;
				}
			}
		});
		this.textField.addEventListener("blur", function() {
			if (that.bottomView.visible == false) {
				that.container.borderColor = containerBorderColor;
			} else {
				if (bottomViewColor) {
					that.bottomView.backgroundColor = bottomViewColor;
				}
			}
		});
	}

	focus() {
		this.textField.focus();
	}

	blur() {
		this.textField.blur();
	}

	getValue() {
		return this.textField.value || null;
	}

	setValue(val) {
		this.textField.value = val;
	}
}

exports.TextField = TextField;

exports.createView = e => {
	let textfield = new TextField(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
