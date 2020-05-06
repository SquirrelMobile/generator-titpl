import { FakeTextField } from "classes/ui/champs/fakeTextField";

class TextFieldDate extends FakeTextField {
	constructor(obj) {
		super(obj);
		var that = this;
		this.container.addEventListener("click", function() {
			let controllerDate = Alloy.createController("/partials/dialogDate", {
				date: that.textField.value || Alloy.Globals.moment(),
				title: that.textField.hintText,
			});
			controllerDate.on("date", date => {
				let currentDate = Alloy.Globals.moment(date);
				that.faketextField.text = currentDate.format("DD MMMM YYYY");
				that.faketextField.date = currentDate;
				that.faketextField.fireEvent("change", {});
				that.faketextField.color = Alloy.CFG.COLORS.black;
			});
			if (OS_IOS) {
				controllerDate.getView().open({ animated: true });
			} else {
				controllerDate.getView().open({
					activityEnterAnimation: Ti.Android.R.anim.fade_in,
				});
			}
		});

		this.createButton(
			{
				title: "\uf133",
			},
			"buttonRight",
		);
	}

	focus() {
		this.container.fireEvent("click");
	}

	getValue() {
		return this.faketextField && this.faketextField.date ? this.faketextField.date.format() : null;
	}

	setValue(val) {
		let currentDate = Alloy.Globals.moment(val);
		_this.faketextField.text = currentDate.format("DD MMMM YYYY");
	}
}

exports.TextFieldDate = TextFieldDate;

exports.createView = e => {
	let textfield = new TextFieldDate(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
