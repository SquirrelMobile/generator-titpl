import { Button } from "classes/ui/button";

export class Field {
	constructor(obj) {
		// list of possible errors in the fields
		this.errors = {
			EMAIL_NOT_VALIDATED: { id: 1, text: "- " + L("error.email_not_validated") },
			PHONE_NOT_VALIDATED: { id: 2, text: "- " + L("error.phone_not_validated") },
			PASSWORD_NOT_LENGTH: { id: 3, text: "- " + L("error.password_not_validated") },
		};
		this.id = obj.id;
		this.activeColor = obj.default && obj.default.activeColor;
		this.required = obj.required;
		this.defaultParams = obj.default;
		let defaultParams = obj.default;
		this.createAndSetView(
			"parent",
			"createView",
			defaultParams && defaultParams.parent,
			obj.parent,
		);

		if (obj.title) {
			if (obj.title.text && obj.required) {
				obj.title.text = obj.title.text + " *";
			}
			this.createAndSetView(
				"title",
				"createLabel",
				defaultParams && defaultParams.title,
				obj.title,
			);
			this.parent.add(this.title);
		}

		this.createAndSetView(
			"container",
			"createView",
			defaultParams && defaultParams.container,
			obj.container,
		);
		this.createAndSetView(
			"fieldView",
			"createView",
			defaultParams && defaultParams.fieldView,
			obj.fieldView,
		);

		this.container.add(this.fieldView);

		if (obj.buttonLeft) {
			this.createButton(obj.buttonLeft, "buttonLeft");
		}
		if (obj.buttonRight) {
			this.createButton(obj.buttonRight, "buttonRight");
		}

		this.parent.add(this.container);

		if (defaultParams && defaultParams.bottomView) {
			this.createAndSetView(
				"bottomView",
				"createView",
				defaultParams && defaultParams.bottomView,
				_.extend(obj.bottomView, {
					bottom: 0,
					zIndex: 99,
				}),
			);

			this.parent.add(this.bottomView);
		}
	}

	// Create right or left buttons
	createButton(obj, key) {
		if (obj) {
			if (key === "buttonLeft") {
				this[key] = Ti.UI.createButton(
					(this.defaultParams && this.defaultParams.buttonIcons) || {},
				);
				this[key].left = 0;
				this[key].applyProperties(obj);
				this.fieldView.left = this[key].width;
				this.container.add(this[key]);
			} else {
				this[key] = Ti.UI.createButton(
					(this.defaultParams && this.defaultParams.buttonIcons) || {},
				);
				this[key].right = 0;
				this[key].applyProperties(obj);
				this.fieldView.right = this[key].width;
				this.container.add(this[key]);
			}
		}
	}

	// Create view and set with default property and current property
	createAndSetView(id, method, defaultParam, value) {
		this[id] = Ti.UI[method]({});
		if (defaultParam) {
			this[id].applyProperties(defaultParam);
		}
		if (value) {
			this[id].applyProperties(value);
		}
	}
}
