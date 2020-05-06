class Button {
	constructor(obj) {
		this.activeColor = obj.activeColor || "red";
		this.disabledColor = obj.disabledColor || "white";
		this.id = obj.id;
		this.createSetView(
			"view",
			"createView",
			{
				height: Ti.UI.SIZE,
				width: Ti.UI.SIZE,
				touchFeedback: true,
				backgroundColor: obj.disabledColor,
			},
			obj.view,
		);
		this.createSetView(
			"viewPadding",
			"createView",
			{
				height: Ti.UI.SIZE,
				top: 10,
				touchEnabled: false,
				bottom: 10,
				layout: "vertical",
				width: Ti.UI.SIZE,
			},
			obj.viewPadding,
		);

		this.createSetView(
			"label",
			"createLabel",
			this.defaultParams && this.defaultParams.label,
			obj.label,
		);

		this.createSetView(
			"icon",
			"createLabel",
			{
				height: Ti.UI.SIZE,
				touchEnabled: false,
				color: this.activeColor,
				top: 10,
				font: { fontFamily: "FontAwesome5Pro-Solid", fontSize: 40 },
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				width: Ti.UI.FILL,
			},
			obj.icon,
		);

		this.setActive(obj.active);

		this.viewPadding.add(this.icon);
		this.viewPadding.add(this.label);
		this.view.add(this.viewPadding);
	}

	setActive(bool) {
		this.activate = bool;
		this.view.backgroundColor = bool ? this.activeColor : this.disabledColor;
		this.view.opacity = bool ? 1 : 0.8;
		this.icon.color = !bool ? this.activeColor : this.disabledColor;
		this.label.color = !bool ? this.activeColor : this.disabledColor;
	}

	createSetView(id, method, defaultParam, value) {
		this[id] = Ti.UI[method]({});
		if (defaultParam) {
			this[id].applyProperties(defaultParam);
		}
		if (value) {
			this[id].applyProperties(value);
		}
	}
}

exports.Button = Button;

exports.createView = e => {
	let textfield = new Button(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
