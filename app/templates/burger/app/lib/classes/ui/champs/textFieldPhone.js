import { TextField } from "classes/ui/champs/textField";

class TextFieldPhone extends TextField {
	constructor(obj) {
		super(obj);
		this.hasPrefix = obj.hasPrefix !== false ? true : false;
		this.PhoneNumber = require("awesome-phonenumber");

		this.createButton(
			{
				title: "\uf095",
			},
			"buttonRight",
		);

		this.textField.applyProperties({
			keyboardType: Ti.UI.KEYBOARD_TYPE_PHONE_PAD,
			autofillType: Titanium.UI.AUTOFILL_TYPE_PHONE,
		});
		if (this.hasPrefix == true) {
			this.createAndSetView(
				"prefix",
				"createLabel",
				{
					text: "---",
					textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
					minimumFontSize: 7,
					touchFeedback: true,
					width: 70,
					left: 0,
				},
				obj.prefix,
			);

			this.textField.applyProperties({
				left: this.prefix.width + 10,
			});
			this.prefix.data = {
				alpha2: "FR",
				alpha3: "FRA",
				countryCallingCodes: ["+33"],
				currencies: ["EUR"],
				emoji: "🇫🇷",
				ioc: "FRA",
				languages: ["fra"],
				name: "France",
				status: "assigned",
			};
			this.prefix.text = "🇫🇷";
			this.prefix.text += "+33";

			var that = this;
			this.prefix.addEventListener("click", e => {
				var c = Alloy.createWidget("fr.squirrel.prefixPhone", { bgTitle: Alloy.CFG.COLORS.main });
				c.on("selectCountry", function(prefix) {
					that.prefix.data = prefix;
					that.prefix.text = prefix.emoji + " ";
					that.prefix.text += prefix.countryCallingCodes[0] ? prefix.countryCallingCodes[0] : "0";
					that.textField.focus();
				});
				c.getView().open();
			});
			this.container.add(this.prefix);
			this.separator = Ti.UI.createView({
				height: Ti.UI.FILL,
				backgroundColor: Alloy.CFG.COLORS.black,
				left: this.prefix.width,
				width: 1,
			});
			this.container.add(this.separator);
		}
	}

	checkError(obj) {
		return this.checkIfPhoneIsValid() ? false : this.errors.PHONE_NOT_VALIDATED;
	}

	isValid(tel, prefix) {
		let PhoneNumber = require("awesome-phonenumber");
		var pn = new PhoneNumber(tel, prefix || " ");
		return pn.isValid();
	}

	checkIfPhoneIsValid() {
		if (this.hasPrefix == true) {
			if (this.prefix && this.prefix.data) {
				return this.isValid(this.textField.value, this.prefix.data.alpha2);
			} else {
				return false;
			}
		} else {
			return true;
		}
	}

	valideEmail(valeur) {
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(valeur);
	}
}

exports.TextFieldPhone = TextFieldPhone;

exports.createView = e => {
	let textfield = new TextFieldPhone(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
