import { Field } from "classes/ui/champs/field";

class CheckBox extends Field {
	constructor(obj) {
		super(obj);
		this.createAndSetView(
			"containerCheckBox",
			"createView",
			{
				height: Ti.UI.SIZE,
				layout: "horizontal",
				horizontalWrap: false,
				width: Ti.UI.FILL,
			},
			obj.containerCheckBox,
		);
		this.container.backgroundColor = this.container.borderColor = "transparent";
		if (this.bottomView) {
			this.container.backgroundColor = "transparent";
		}
		this.checkBox = require("ti.animation").createAnimationView({
			height: 45,
			width: 45,
			visible: true,
			zIndex: 99,
			startFrame: 30,
			endFrame: 75,
			file: "/animCheckbox.json",
		});

		if (obj.checkBox) {
			this.checkBox.applyProperties(obj.checkBox);
		}
		this.value = false;
		this.createAndSetView("label", "createLabel", null, obj.label);
		this.checkBox.setFrame(1);
		var that = this;
		this.checkBox.addEventListener("click", function() {
			that.value = !that.value;
			that.setValue(that.value);
		});
		this.containerCheckBox.add(this.checkBox);
		this.containerCheckBox.add(this.label);
		this.container.add(this.containerCheckBox);
		this.checkBox.start(0, 30);
	}

	focus() {}

	blur() {}

	getValue() {
		return this.value;
	}

	setValue(bool) {
		this.value = bool;
		if (bool) {
			this.checkBox.stop();
			this.checkBox.start(30, 75);
		} else {
			this.checkBox.stop();
			this.checkBox.start(95, 150);
		}
	}
}

exports.CheckBox = CheckBox;

exports.createView = e => {
	let checkBox = new CheckBox(e);
	checkBox.parent.super = () => {
		return checkBox;
	};

	return checkBox.parent;
};
