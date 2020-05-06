import { Field } from "classes/ui/champs/field";
import { Button } from "classes/ui/champs/button";

class ButtonsMultiple extends Field {
	constructor(obj) {
		super(obj);
		this.view = Ti.UI.createView({
			height: Ti.UI.SIZE,
			layout: "horizontal",
			horizontalWrap: false,
			width: Ti.UI.FILL,
		});
		this.buttons = [];
		this.container.height = Ti.UI.SIZE;
		this.fieldView.height = Ti.UI.SIZE;
		var that = this;
		this.currentActive = null;
		_.each(obj.data, function(d, i) {
			d["activeColor"] = obj.activeColor;
			d["disabledColor"] = obj.disabledColor;
			var button = new Button(d);
			button.view.width = Math.ceil((1 / obj.data.length) * 100) + "%";
			that.buttons.push(button);
			if (d.active) {
				that.currentActive = button;
			}
			button.view.addEventListener("click", function(e) {
				if (that.currentActive) {
					that.currentActive.setActive(false);
				}
				that.currentActive = button;
				button.setActive(true);
			});
			that.view.add(button.view);
		});

		this.fieldView.add(this.view);
	}

	focus() {}

	getValue() {
		return this.currentActive.id;
	}

	setValue(num) {
		this.buttons[num].setActive(true);
	}
}

exports.ButtonsMultiple = ButtonsMultiple;

exports.createView = e => {
	let textfield = new ButtonsMultiple(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
