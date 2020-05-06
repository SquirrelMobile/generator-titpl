import { FakeTextField } from "classes/ui/champs/fakeTextField";

class TextFieldList extends FakeTextField {
	constructor(obj) {
		super(obj);

		this.createButton(
			{
				title: "\uf0d7",
			},
			"buttonRight",
		);

		if (OS_ANDROID) {
			this.fieldView.remove(this.faketextField);
			var data = [];
			if (obj.list) {
				this.currentChoice = _.first(obj.list);

				this.faketextField = Ti.UI.createPicker({
					text: obj.textField.hintText,
					height: Ti.UI.FILL,
					width: Ti.UI.FILL,
				});
				if (this.defaultParams && this.defaultParams.textField) {
					this.faketextField.applyProperties(this.defaultParams.textField);
				}

				var column1 = Ti.UI.createPickerColumn({ width: Ti.UI.FILL });
				this.list = obj.list;
				this.faketextField.value = this.list[0];
				this.faketextField.val = this.list[0];
				_.map(obj.list, function(ev) {
					var title = "picker." + ev.text;
					var titleComplete = L(title);
					return column1.addRow(
						Ti.UI.createPickerRow(
							_.extend(ev, {
								title: titleComplete,
								val: ev.text,
								textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
							}),
						),
					);
				});
				var that = this;
				this.faketextField.addEventListener("change", function(e) {
					that.faketextField.value = that.list[e.rowIndex];
					that.faketextField.val = that.list[e.rowIndex];
				});
				this.faketextField.add([column1]);
				this.fieldView.add(this.faketextField);
			}
		} else if (OS_IOS) {
			this.faketextField.color = obj.color;
			var first = _.first(obj.list);
			if (first) {
				this.currentChoice = first;
				if (first.text === "") {
					this.faketextField.applyProperties(first);
					(this.faketextField.color = "gray"), (this.faketextField.text = "Non renseigné");
					this.faketextField.val = first.text;
				} else {
					var key = first.text;
					this.faketextField.applyProperties(first);
					this.setValue(L(key));
					this.faketextField.val = first.text;
				}
			}
			var that = this;
			this.container.addEventListener("click", function(e) {
				if (obj.list) {
					Alloy.createController("/partials/_picker", {
						data: obj.list,
						title: obj.hintText || obj.hintTextTitle,
					})
						.on("click", function(val) {
							that.faketextField.fireEvent("change", {
								row: {
									val: val.val,
									value: val.value,
								},
							});
							that.faketextField.value = val.value;
							that.faketextField.val = val.val;
							that.setValue(L("picker." + val.val));
						})
						.getView()
						.open();
				}
			});
		}
	}

	getValue() {
		return this.faketextField.value || null;
	}

	setValue(val) {
		if (OS_ANDROID) {
			this.faketextField.setSelectedRow(0, _.findIndex(this.list, { text: val }));
		}
		this.faketextField.text = L("picker." + val);
		this.faketextField.value = val;
		this.faketextField.val = val;
	}
}

exports.TextFieldList = TextFieldList;

exports.createView = e => {
	let textfield = new TextFieldList(e);
	textfield.parent.super = () => {
		return textfield;
	};

	return textfield.parent;
};
