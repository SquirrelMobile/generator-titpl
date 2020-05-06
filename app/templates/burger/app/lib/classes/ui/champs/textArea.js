import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/button";

class TextArea extends Field {
	constructor(obj) {
		super(obj);
		this.textArea = require("/xp.ui").createTextArea({
			next: obj.next,
			hintText: obj.textArea && obj.textArea.hintText ? obj.textArea.hintText : "",
			previous: obj.previous,
		});
		if (this.defaultParams && this.defaultParams.textField) {
			this.textArea.applyProperties(this.defaultParams.textField);
		}
		this.textArea.height = 100;
		this.container.height = 100;
		if (obj.textArea) {
			this.textArea.applyProperties(obj.textArea);
		}
		this.textArea.id = obj.id;
		this.textArea.next = obj.next;
		this.textArea.previous = obj.previous;
		this.required = obj.required;
		if (obj.required) {
			this.textArea.hintText = this.textArea.hintText ? this.textArea.hintText + " *" : "";
		}
		this.fieldView.add(this.textArea);

		var that = this;
		var containerBorderColor = this.container.borderColor;
		this.textArea.addEventListener("focus", function() {
			that.container.borderColor = that.activeColor;
		});
		this.textArea.addEventListener("blur", function() {
			that.container.borderColor = containerBorderColor;
		});
	}

	focus() {
		this.textArea.focus();
	}

	blur() {
		this.textArea.blur();
	}

	getValue() {
		return this.textArea.value || null;
	}

	setValue(val) {
		this.textArea.value = val;
	}
}

exports.TextArea = TextArea;

exports.createView = e => {
	let textArea = new TextArea(e);
	textArea.parent.super = () => {
		return textArea;
	};

	return textArea.parent;
};
