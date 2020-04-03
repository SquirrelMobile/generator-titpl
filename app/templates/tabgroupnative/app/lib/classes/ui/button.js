/**
 * @class Button
 * Create custom button with optionnel icon
 *
 */

import { underlineall } from "/classes/ui/attrstring";

class Button {
	/**
	 * @method constructor
	 * Initialize the button class
	 * @param  {Object} obj
	 * @example
   <ButtonWithIcon onIconClick="handleIconClick" module="classes/ui/button" />
	 * {
	 *	button : {},
	 *	label : {},
	 *	icon : {},
	 *	underline : true / false
	 action : {
		 type : "phone" , "email"
		 value : "" //use for value phone or recipient email
		 subjet : "" //is for subject email
	 }
	 * }
	 */
	constructor(obj) {
		let that = this;

		this.action = obj.action;

		this.parent = Ti.UI.createView(
			_.extend(
				{
					id: "parent",
					height: 40,
					elevation: 10,
					borderRadius: 0,
				},
				obj.button || {},
			),
		);

		let view = Ti.UI.createView({
			width: Ti.UI.SIZE,
			layout: "horizontal",
			//touchEnabled: false,
		});

		this.label = Ti.UI.createLabel(
			_.extend(
				{
					width: Ti.UI.SIZE,
					id: "lbl",
					touchEnabled: false,
					height: Ti.UI.FILL,
					textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
					minimumFontSize: 7,
					font: { fontFamily: Alloy.CFG.FONTS.regular, fontSize: 15 },
				},
				obj.label,
			),
		);

		if (obj.icon) {
			this.icon = Ti.UI.createLabel(
				_.extend(
					{
						width: Ti.UI.SIZE,
						id: "icon",
						//touchEnabled: false,
						height: Ti.UI.SIZE,
						textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
						font: { fontFamily: Alloy.CFG.FONTS.falight, fontSize: 20 },
					},
					obj.icon,
				),
			);
			this.icon.addEventListener("click", e => {
				this.parent.fireEvent("iconClick", e);
			});
			view.add(this.icon);
		}

		if (obj.underline && obj.label.text) {
			this.label.attributedString = require("core").getAttributed(underlineall(args.label.text));
		}

		this.parent.addEventListener("touchstart", e => {
			this.label.animate({
				opacity: 0.2,
				duration: 250,
			});
			if (this.icon) {
				this.icon.animate({
					opacity: 0.2,
					duration: 250,
				});
			}
		});
		this.parent.addEventListener("touchend", e => {
			setTimeout(function() {
				that.label.animate({
					opacity: 1,
					duration: 250,
				});
				if (that.icon) {
					that.icon.animate({
						opacity: 1,
						duration: 250,
					});
				}
			}, 300);
		});

		view.add(this.label);
		this.parent.add(view);

		return this;
	}

	actionFn() {
		if (this.action) {
			switch (this.action.type) {
				case "email":
					if (this.action.value) {
						let emailDialog = Ti.UI.createEmailDialog({});
						emailDialog.subject = this.action.subject;
						emailDialog.toRecipients = [this.action.value];
						emailDialog.open();
					}
					break;
				case "phone":
					if (this.action.value) {
						//Ti.Platform.openURL("tel:" + this.action.value);
					}
					break;
			}
		}
	}
}

exports.Button = Button;

exports.createButtonWithIcon = e => {
	let button = new Button(e);
	button.parent.super = () => {
		return button;
	};

	return button.parent;
};
